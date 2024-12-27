import express from 'express';
import { getAllUsers, logout, signIn, signUp, updateUser } from '../controllers/user.Controllers.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router  = express.Router();


router.route("/register").post(signUp);
router.route("/signin").post(signIn);
router.route("/update").put(authMiddleware, updateUser)
router.route("/logout").post(authMiddleware, logout)
router.route("/allUsers").get(authMiddleware, getAllUsers)
export default router;
