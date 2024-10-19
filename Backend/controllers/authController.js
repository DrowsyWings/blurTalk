const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const User = require("../db/userModel.js");
const nodemailer = require("nodemailer");
const zod = require("zod");
const jwt = require("jsonwebtoken");

const signupBody = zod.object({
  username: zod.string().min(3),
  email: zod.string().email(),
  password: zod.string().min(6),
});

const registerUser = asyncHandler(async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    throw new ApiError(411, "Incorrect Inputs!!");
  }

  const existingUsername = await User.findOne({
    username: req.body.username,
  });

  const existingEmail = await User.findOne({
    email: req.body.email,
  });

  if (existingUsername) {
    throw new ApiError(411, "Username already Exists!");
  }
  if (existingEmail) {
    throw new ApiError(411, "This email is already Registered!");
  }

  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user!");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createdUser,
        "Congrats!!..User registered Successfully."
      )
    );
});

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    throw new ApiError(400, "username is required");
  }

  const user = await User.findOne({
    username: req.body.username,
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res)=>{
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

  if (!incomingRefreshToken) {
      throw new ApiError(401, "unauthorized request")
  }

  try {
      const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
      const user = await User.findById(decodedToken?._id)

      if (!user) {
          throw new ApiError(401, "Invalid refresh token")
      }

      if (incomingRefreshToken !== user?.refreshToken) {
          throw new ApiError(401, "Refresh token is expired or used")
          
      }

      const options = {
          httpOnly: true,
          secure: true
      }

      const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)

      return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
          new ApiResponse(
              200, 
              {accessToken, refreshToken: newRefreshToken},
              "Access token refreshed"
          )
      )
  } 
  catch (error) {
      throw new ApiError(401, error?.message || "Invalid refresh token")
  }
})

const accountRecovery = asyncHandler(async(req,res)=>{
  const {username} = req.body;
  console.log(username);
  if(!username){
    throw new ApiError(400, "username is required");
  }

  const user = await User.findOne({
    username: req.body.username,
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tyagi001tanishq@gmail.com",
      pass: "wqcv fwcd teko lqgo",
    },
  });

  console.log(user.email);
  let mailOptions = {
    from: "tyagi001tanishq@gmail.com",
    to: user.email,
    subject: "Password Reset Code",
    text: `Your verification code is ${otp}. It will expire in 2 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new ApiError(411,error.message)
    }

    return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          otp: otp,
          username: user.username,
          email: user.email
        },
        "Email sent to the user!"
      )
    );
  });

})

const changePassword = asyncHandler(async(req,res)=>{
  const {username,password} = req.body;

  if(!username){
    throw new ApiError(411,"Username is required");
  }
  if(!password){
    throw new ApiError(411,"Password is required!");
  }

  const user = await User.findOne({
    username: req.body.username,
  });

  if(!user){
    throw new ApiError(411,"User does not exist!")
  }

  user.password = password
  await user.save({validateBeforeSave: false})

  return res
    .status(200)
    .json(
      new ApiResponse(
        200, 
        {
          usename:user.username
        },
        "Password changed successfully"
      )
    )
});

const allUsers = asyncHandler(async(req,res)=>{
  const keyword = req.query.search?{
    $or :[
      {name: {$regex: req.query.search,$options: "i"}},
      {email: {$regex: req.query.search,$options: "i"}},
    ]
  }: {};

  const users = await User.find(keyword).find({_id: {$ne: req.users._id}});
  res.send(users); 
})

const allUser = asyncHandler(async(req,res)=>{
})


module.exports = { registerUser, loginUser, logoutUser,refreshAccessToken,changePassword,accountRecovery,allUsers};
