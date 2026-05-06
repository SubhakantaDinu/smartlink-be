import { Request, Response, NextFunction } from 'express';
import { qrService } from '../services/qr.service';
import { CreateQRSchema, UpdateQRSchema } from '../validators/qr.validator';
import { ZodError } from 'zod';

export const qrController = {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = CreateQRSchema.parse(req.body);
      const card = await qrService.createQR(parsed);
      res.status(201).json({
        success: true,
        message: 'QR created successfully',
        data: card,
      });
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ success: false, message: 'Validation error', errors: err.errors });
        return;
      }
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cards = await qrService.getAllQRs();
      res.json({ success: true, message: 'OK', data: cards });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const card = await qrService.getQRById(req.params.id);
      if (!card) {
        res.status(404).json({ success: false, message: 'QR card not found' });
        return;
      }
      res.json({ success: true, message: 'OK', data: card });
    } catch (err) {
      next(err);
    }
  },

  async getPublicBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await qrService.getPublicCardBySlug(req.params.slug);
      res.json({ success: true, message: 'OK', data });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = UpdateQRSchema.parse(req.body);
      const card = await qrService.updateQR(req.params.id, parsed);
      res.json({ success: true, message: 'QR updated successfully', data: card });
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ success: false, message: 'Validation error', errors: err.errors });
        return;
      }
      if ((err as Error).message === 'QR card not found') {
        res.status(404).json({ success: false, message: 'QR card not found' });
        return;
      }
      next(err);
    }
  },

  async toggleStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const card = await qrService.toggleStatus(req.params.id);
      res.json({
        success: true,
        message: `QR ${card.enabled ? 'enabled' : 'disabled'} successfully`,
        data: card,
      });
    } catch (err) {
      if ((err as Error).message === 'QR card not found') {
        res.status(404).json({ success: false, message: 'QR card not found' });
        return;
      }
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await qrService.deleteQR(req.params.id);
      res.json({ success: true, message: 'QR deleted successfully' });
    } catch (err) {
      if ((err as Error).message === 'QR card not found') {
        res.status(404).json({ success: false, message: 'QR card not found' });
        return;
      }
      next(err);
    }
  },
};
