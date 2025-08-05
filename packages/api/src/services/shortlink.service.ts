import { db } from "../config/database";
import { redis } from "../config/redis";
import { generateSlug } from "../utils/generateSlug";

export async function createShortlink(originalUrl: string): Promise<string> {
  const slug = generateSlug();
  await db.query('INSERT INTO shortlinks (slug, original_url) VALUES ($1, $2)', [slug, originalUrl]);
  await redis.set(`shortlink:${slug}`, originalUrl);
  return slug;
}

export async function resolveShortlink(slug: string): Promise<string | null> {
  const cached = await redis.get(`shortlink:${slug}`);
  if (cached) return cached;

  const result = await db.query('SELECT original_url FROM shortlinks WHERE slug = $1', [slug]);
  if (result.rowCount === 0) return null;

  const url = result.rows[0].original_url;
  await redis.set(`shortlink:${slug}`, url);
  return url;
}