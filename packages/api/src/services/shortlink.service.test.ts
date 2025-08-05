import { createShortlink, resolveShortlink } from './shortlink.service';

jest.mock('../config/database', () => ({
  db: {
    query: jest.fn(),
  },
}));
jest.mock('../config/redis', () => ({
  redis: {
    get: jest.fn(),
    set: jest.fn(),
  },
}));
jest.mock('../utils/generateSlug', () => ({
  generateSlug: () => 'testslug',
}));

const { db } = require('../config/database');
const { redis } = require('../config/redis');

describe('Shortlink Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('createShortlink deve criar e retornar o slug', async () => {
    db.query.mockResolvedValue({});
    redis.set.mockResolvedValue('OK');
    const slug = await createShortlink('https://example.com');
    expect(slug).toBe('testslug');
    expect(db.query).toHaveBeenCalledWith(
      'INSERT INTO shortlinks (slug, original_url) VALUES ($1, $2)',
      ['testslug', 'https://example.com']
    );
    expect(redis.set).toHaveBeenCalledWith('shortlink:testslug', 'https://example.com');
  });

  it('resolveShortlink retorna da cache se existir', async () => {
    redis.get.mockResolvedValue('https://cached.com');
    const url = await resolveShortlink('testslug');
    expect(url).toBe('https://cached.com');
    expect(redis.get).toHaveBeenCalledWith('shortlink:testslug');
    expect(db.query).not.toHaveBeenCalled();
  });

  it('resolveShortlink busca no banco se não estiver no cache', async () => {
    redis.get.mockResolvedValue(null);
    db.query.mockResolvedValue({
      rowCount: 1,
      rows: [{ original_url: 'https://db.com' }],
    });
    redis.set.mockResolvedValue('OK');
    const url = await resolveShortlink('testslug');
    expect(url).toBe('https://db.com');
    expect(db.query).toHaveBeenCalledWith(
      'SELECT original_url FROM shortlinks WHERE slug = $1',
      ['testslug']
    );
    expect(redis.set).toHaveBeenCalledWith('shortlink:testslug', 'https://db.com');
  });

  it('resolveShortlink retorna null se não encontrar no banco', async () => {
    redis.get.mockResolvedValue(null);
    db.query.mockResolvedValue({ rowCount: 0, rows: [] });
    const url = await resolveShortlink('testslug');
    expect(url).toBeNull();
  });
});