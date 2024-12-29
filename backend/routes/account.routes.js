import express from 'express';

import { checkBalance, transferMoney } from '../controllers/account.Controllers.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const accountRoutes = express.Router();

accountRoutes.route("/balance").get(authMiddleware, checkBalance)
accountRoutes.route('/transfer').put(authMiddleware, transferMoney)

export default accountRoutes;