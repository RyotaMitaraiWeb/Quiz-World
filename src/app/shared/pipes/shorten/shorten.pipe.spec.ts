import { ShortenPipe } from './shorten.pipe';

describe('ShortenPipe', () => {
  let pipe = new ShortenPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Returns the same string if lower than or equal to the default max length', () => {
    const value = pipe.transform('a');
    expect(value).toBe('a');

    const value2 = pipe.transform('a'.repeat(50));
    expect(value2).toBe('a'.repeat(50));
  });

  it('Returns a shortened string if longer than the default max length', () => {
    const value = pipe.transform('a'.repeat(51));
    expect(value).toBe('a'.repeat(50) + '...');
  });

  it('Returns a shortened string if longer than the provided max length', () => {
    const value = pipe.transform('aaa', 1);
    expect(value).toBe('a...');
  });
});
