import express from 'express';

import { checkBalance } from '../controllers/account.Controllers.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const accountRoutes = express.Router();

accountRoutes.route("/balance").get(authMiddleware, checkBalance)

export default accountRoutes;