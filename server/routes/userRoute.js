import express from "express";
import {
  getAdmins,
  getMyProfile,
  loginController,
  logoutController,
  registerController,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.get("/logout", isAuthenticated, logoutController);
userRouter.get("/my-profile", getMyProfile);
userRouter.get("/admins", getAdmins);

export default userRouter;
