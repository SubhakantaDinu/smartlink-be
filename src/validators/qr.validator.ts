import { z } from 'zod';

export const CreateQRSchema = z.object({
  business_name: z.string().min(1, 'Business name is required').max(100),
  owner_name: z.string().min(1, 'Owner name is required').max(100),
  phone: z.string().min(7, 'Phone is required').max(20),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  whatsapp_number: z.string().max(20).optional(),
  google_maps_link: z.string().url('Invalid URL').optional().or(z.literal('')),
  upi_id: z.string().max(50).optional(),
  youtube_link: z.string().url('Invalid URL').optional().or(z.literal('')),
  google_review_link: z.string().url('Invalid URL').optional().or(z.literal('')),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  instagram: z.string().max(100).optional(),
  facebook: z.string().max(100).optional(),
  logo_url: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export const UpdateQRSchema = z.object({
  business_name: z.string().min(1).max(100).optional(),
  owner_name: z.string().min(1).max(100).optional(),
  phone: z.string().min(7).max(20).optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  whatsapp_number: z.string().max(20).optional(),
  google_maps_link: z.string().url('Invalid URL').optional().or(z.literal('')),
  upi_id: z.string().max(50).optional(),
  youtube_link: z.string().url('Invalid URL').optional().or(z.literal('')),
  google_review_link: z.string().url('Invalid URL').optional().or(z.literal('')),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  instagram: z.string().max(100).optional(),
  facebook: z.string().max(100).optional(),
  logo_url: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export type CreateQRInput = z.infer<typeof CreateQRSchema>;
export type UpdateQRInput = z.infer<typeof UpdateQRSchema>;
