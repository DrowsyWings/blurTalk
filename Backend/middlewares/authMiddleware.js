const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError.js");
const User = require("../db/userModel.js")

const verifyJWT = (async(req, _, next) => {
    try {
        const jwtToken =req.cookies?.accessToken|| req.headers.authorization; // bearer token
        const words = jwtToken.split(" "); // ["Bearer", "token"]
        const token = words[1]; // token

  
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
        const user = await User.findById(decodedToken?.id).select("-password -refreshToken");
  
        if (!user) {            
            throw new ApiError(401, "Invalid Access Token");
        }
  
        req.user = user;
        next();
    } 
    catch (error) {
        console.error("JWT Verification Error:", error.message);  // Log any errors
        throw new ApiError(401, error?.message || "Invalid access token");
    }
  });
  

module.exports = verifyJWT;
