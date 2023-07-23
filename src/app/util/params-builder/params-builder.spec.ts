import { paramsBuilder } from './params-builder';

describe('paramsBuilder', () => {
  it('appends page, sort, and order', () => {
    const params = paramsBuilder(2, 'title', 'desc');
    expect(params.get('page')).toBe('2');
    expect(params.get('sort')).toBe('title');
    expect(params.get('order')).toBe('desc');
  });

  it('appends only the params that were provided', () => {
    let params = paramsBuilder(2, undefined, 'asc');
    expect(params.get('page')).toBe('2');
    expect(params.get('sort')).toBe(null);
    expect(params.get('order')).toBe('asc');

    params = paramsBuilder(undefined, undefined, 'asc');
    expect(params.get('page')).toBe(null);
    expect(params.get('sort')).toBe(null);
    expect(params.get('order')).toBe('asc');

    params = paramsBuilder(undefined, undefined, undefined);
    expect(params.get('page')).toBe(null);
    expect(params.get('sort')).toBe(null);
    expect(params.get('order')).toBe(null);
  });
});