import { Router } from 'express';
import { qrController } from '../controllers/qr.controller';
import { verifyFirebaseToken } from '../middlewares/auth.middleware';

const router = Router();

// Public — no auth required
router.get('/card/:slug', qrController.getPublicBySlug);

// Protected — require valid Firebase token
router.use(verifyFirebaseToken);
router.post('/', qrController.create);
router.get('/', qrController.getAll);
router.get('/:id', qrController.getById);
router.put('/:id', qrController.update);
router.patch('/:id/status', qrController.toggleStatus);
router.delete('/:id', qrController.remove);

export default router;
