import dotenv from 'dotenv';
import Redis from 'ioredis';
dotenv.config();

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});