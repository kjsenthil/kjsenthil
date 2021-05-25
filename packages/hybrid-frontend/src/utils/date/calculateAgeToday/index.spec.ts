import MockDate from 'mockdate';
import calculateAgeToday from '.';

describe('calculateAgeToday', () => {
  beforeEach(() => {
    MockDate.set('2021-12-21');
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('returns an age in years given a date of birth', () => {
    const dateOfBirth = new Date('1971-12-21T00:00:00');
    expect(calculateAgeToday(dateOfBirth)).toStrictEqual(50);
  });
});
