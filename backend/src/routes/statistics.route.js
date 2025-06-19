import { Router } from 'express';
import { getTotalStatistics } from '../controllers/statistics.controller.js';
import {
  authMiddleware,
  adminMiddleware,
} from '../middlewares/auth.middleware.js';
const router = Router();

router.route('/').get([authMiddleware, adminMiddleware], getTotalStatistics);

export default router;
