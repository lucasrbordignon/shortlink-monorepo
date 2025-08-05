import { NextFunction, Request, Response } from 'express';

type RateLimitEntry = {
  count: number;
  lastRequest: number;
};

const rateLimitMap = new Map<string, RateLimitEntry>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hora
const MAX_REQUESTS = 20; // Máximo de 20 requisições por IP por minuto

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip ?? 'unknown';

  const currentTime = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, lastRequest: currentTime });
    return next();
  }

  const timeDiff = currentTime - record.lastRequest;

  if (timeDiff > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastRequest: currentTime });
    return next();
  }

  if (record.count >= MAX_REQUESTS) {
    return res.status(429).json({
      message: 'Too many requests. Please try again later.',
    });
  }

  record.count++;
  rateLimitMap.set(ip, record);
  
  next();
}