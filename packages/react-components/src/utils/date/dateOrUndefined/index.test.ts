import dateOrUndefined from './index';

describe('dateOrUndefined', () => {
  it('should return undefined if string param is undefined', () => {
    expect(dateOrUndefined(undefined)).toBeUndefined();
  });

  it('should return undefined if string param is null', () => {
    expect(dateOrUndefined(null)).toBeUndefined();
  });

  it('should return a date if string param is defined', () => {
    expect(dateOrUndefined('2020-01-01')).toBeInstanceOf(Date);
  });
});
