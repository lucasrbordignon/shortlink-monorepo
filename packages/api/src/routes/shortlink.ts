import { Router } from 'express';
import { z } from 'zod';
import { db } from '../config/database';
import { rateLimiter } from '../middlewares/rateLimiter';
import { createShortlink, resolveShortlink } from '../services/shortlink.service';

const router = Router();

router.post('/shorten', rateLimiter, async (req, res) => {
  const schema = z.object({
    url: z.string().url(),
  });

  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: 'Invalid URL' });

  const slug = await createShortlink(result.data.url);
  res.json({ shortlink: `${req.protocol}://${req.get('host')}/${slug}` });
});

router.get('/:slug', async (req, res) => {
  const slug = req.params.slug;
  const originalUrl = await resolveShortlink(slug);

  const accessData = {
    slug,
    ip: req.ip,
    user_agent: req.get('User-Agent'),
    timestamp: new Date(),
    ip_hash: req.ip ? require('crypto').createHash('sha256').update(req.ip).digest('hex') : null,
    referer: req.get('referer'),
  }

  await db.query(
    'INSERT INTO shortlink_accesses (slug, timestamp, ip_hash, user_agent, referer) VALUES ($1, $2, $3, $4, $5)',
    [accessData.slug, accessData.timestamp, accessData.ip_hash, accessData.user_agent, accessData.referer]
  );

  if (!originalUrl) return res.status(404).json({ error: 'Not found' });

  res.redirect(originalUrl);
});

export default router;
