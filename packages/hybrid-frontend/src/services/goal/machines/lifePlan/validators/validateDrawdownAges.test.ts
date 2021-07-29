import context from '../context';
import validateDrawdownAges from './validateDrawdownAges';

const clientAge = 50;

describe('validateDrawdownAges', () => {
  it('validates that user age is up drawdownStartAge', () => {
    expect(
      validateDrawdownAges({ ...context, clientAge, drawdownStartAge: 50, drawdownEndAge: 90 })
    ).toStrictEqual({});

    expect(
      validateDrawdownAges({ ...context, clientAge, drawdownStartAge: 49, drawdownEndAge: 90 })
    ).toStrictEqual({ drawdownStartAge: 'Please pick an age greater than your current age' });
  });

  it('validates drawdownEndAge is up to a 100', () => {
    expect(
      validateDrawdownAges({ ...context, clientAge, drawdownStartAge: 50, drawdownEndAge: 100 })
    ).toStrictEqual({});

    expect(
      validateDrawdownAges({ ...context, clientAge, drawdownStartAge: 50, drawdownEndAge: 101 })
    ).toStrictEqual({ drawdownEndAge: 'Please pick an age less than 100' });
  });

  it('validates drawdownEndAge is greater than drawdownStartAge', () => {
    expect(
      validateDrawdownAges({ ...context, clientAge, drawdownStartAge: 51, drawdownEndAge: 52 })
    ).toStrictEqual({});

    expect(
      validateDrawdownAges({ ...context, clientAge, drawdownStartAge: 51, drawdownEndAge: 51 })
    ).toStrictEqual({ drawdownEndAge: 'Please select an age greater than 51' });
  });
});
