import { Router } from 'express';
import {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
} from '../controllers/song.controller.js';
import {
  adminMiddleware,
  authMiddleware,
} from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/').get([authMiddleware, adminMiddleware], getAllSongs);

router.route('/featuredSongs').get(getFeaturedSongs);

router.route('/forYouSongs').get(getMadeForYouSongs);

router.route('/trendingSongs').get(getTrendingSongs);

export default router;
