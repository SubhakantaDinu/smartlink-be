import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebase';
import { AuthenticatedRequest } from '../types';

export async function verifyFirebaseToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Missing or invalid authorization header' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    // When using the Auth emulator, verifyIdToken works without real Firebase credentials
    const decoded = await admin.auth().verifyIdToken(token);
    (req as AuthenticatedRequest).user = { uid: decoded.uid, email: decoded.email };
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}
