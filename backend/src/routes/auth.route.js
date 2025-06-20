import { Router } from 'express';
import { checkAuth } from '../controllers/auth.controller.js';

const router = Router();

router.route('/auth-callback').post(checkAuth);

export default router;
