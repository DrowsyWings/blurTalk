const express = require("express");
const authRouter = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  accountRecovery,
  changePassword,
  refreshAccessToken
} = require("../controllers/authController");
const verifyJWT = require("../middlewares/authMiddleware.js")

authRouter.post("/signin", loginUser);
authRouter.post("/signup", registerUser);
authRouter.post("/account-recovery", accountRecovery);
authRouter.post("/changePassword",changePassword );

authRouter.route("/logout").post(verifyJWT, logoutUser)
authRouter.route("/refresh-token").post(refreshAccessToken)


module.exports = authRouter;
