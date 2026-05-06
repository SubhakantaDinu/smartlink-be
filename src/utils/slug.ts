import { v4 as uuidv4 } from 'uuid';

export function generateSlug(): string {
  const chars = uuidv4().replace(/-/g, '').slice(0, 6);
  return `smrt-${chars}`;
}
