import express from 'express';
import { getAllUsers, logout, signIn, signUp, updateUser } from '../controllers/user.Controllers.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const userRouter  = express.Router();

userRouter.route("/register").post(signUp);
userRouter.route("/signin").post(signIn);
userRouter.route("/update").put(authMiddleware, updateUser)
userRouter.route("/logout").post(authMiddleware, logout)
userRouter.route("/allUsers").get(authMiddleware, getAllUsers)
export default userRouter;
