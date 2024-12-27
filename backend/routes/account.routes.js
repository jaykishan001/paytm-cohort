import express from 'express';
import router from './signIn.routes';
import { authMiddleware } from '../middleware/authMiddleware';
import { checkBalance } from '../controllers/account.Controllers.js';


const accountRoutes = express.Router();

accountRoutes.route("/balance").get(authMiddleware, checkBalance)

export default accountRoutes;