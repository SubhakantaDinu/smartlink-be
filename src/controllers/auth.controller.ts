import { Request, Response } from 'express';

export const authController = {
  async ping(_req: Request, res: Response): Promise<void> {
    res.json({ success: true, message: 'Auth service is running' });
  },
};
