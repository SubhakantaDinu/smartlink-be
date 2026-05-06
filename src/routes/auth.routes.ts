import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

const router = Router();

router.get('/ping', authController.ping);

export default router;
