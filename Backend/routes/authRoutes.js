const express = require("express");
const authRouter = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  accountRecovery,
  changePassword
} = require("../controllers/authController");

authRouter.post("/signin", loginUser);
authRouter.post("/signup", registerUser);
authRouter.post("/signout", logoutUser);
authRouter.post("/account-recovery", accountRecovery);
authRouter.post("/changePassword",changePassword );


module.exports = authRouter;
