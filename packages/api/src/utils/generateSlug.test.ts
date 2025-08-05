import { generateSlug } from './generateSlug';

describe('generateSlug', () => {
  it('gera slug de tamanho correto', () => {
    const slug = generateSlug(8);
    expect(slug).toHaveLength(8);
  });

  it('gera slug apenas com caracteres válidos', () => {
    const slug = generateSlug(10);
    expect(/^[a-zA-Z0-9]+$/.test(slug)).toBe(true);
  });
});