import { getAdvertsTags } from './selectors';

describe('getAdvertsTags', () => {
  const data = ['motor', 'mobile'];

  test('should return all adverts', () => {
    const result = getAdvertsTags({ tags: { data } });
    expect(result).toEqual(data);
  });
});
