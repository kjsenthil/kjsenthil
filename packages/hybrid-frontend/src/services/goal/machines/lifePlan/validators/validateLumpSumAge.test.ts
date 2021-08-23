import context from '../context';
import validateLumpSumAge from './validateLumpSumAge';

const clientAge = 50;
const drawdownStartAge = 51;
const lumpSum = 50000;

describe('validateLumpSumAge', () => {
  it('validates that lumpSumAge is greater than user age', () => {
    expect(
      validateLumpSumAge({ ...context, clientAge, drawdownStartAge, lumpSum, lumpSumAge: 51 })
    ).toStrictEqual({});

    expect(
      validateLumpSumAge({ ...context, clientAge, drawdownStartAge, lumpSum, lumpSumAge: 50 })
    ).toStrictEqual({
      lumpSumAge: 'The lump sum age should be in the future',
    });

    expect(
      validateLumpSumAge({ ...context, clientAge, drawdownStartAge, lumpSum, lumpSumAge: 49 })
    ).toStrictEqual({
      lumpSumAge: 'The lump sum age should be in the future',
    });
  });

  it('validates lumpSumAge is up to drawdownStartAge', () => {
    expect(
      validateLumpSumAge({ ...context, drawdownStartAge, lumpSum, lumpSumAge: 50 })
    ).toStrictEqual({});

    expect(
      validateLumpSumAge({ ...context, drawdownStartAge, lumpSum, lumpSumAge: 51 })
    ).toStrictEqual({});

    expect(
      validateLumpSumAge({ ...context, drawdownStartAge, lumpSum, lumpSumAge: 52 })
    ).toStrictEqual({
      lumpSumAge: 'The lump sum should be taken out at or before your retirement',
    });
  });
});
