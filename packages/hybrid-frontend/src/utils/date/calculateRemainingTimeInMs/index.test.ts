import MockDate from 'mockdate';
import calculateRemainingTimeInMs from '.';

describe('calculateRemainingTimeInMs', () => {
  beforeEach(() => {
    MockDate.set('2021-12-21T00:00:00');
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('returns remaining milliseconds from now from given date', () => {
    const datetime = new Date('2021-12-21T00:00:20');
    expect(calculateRemainingTimeInMs(datetime)).toStrictEqual(20000);
  });

  it('returns remaining milliseconds from now from given time', () => {
    expect(calculateRemainingTimeInMs(1640044820000)).toStrictEqual(20000);
  });
});
