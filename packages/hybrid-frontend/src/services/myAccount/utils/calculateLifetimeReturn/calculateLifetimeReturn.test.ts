import calculateLifetimeReturn from './calculateLifetimeReturn';

describe('calculateInvestmentReturn', () => {
  it('returns the value and percent', () => {
    const totalValue = 4356;
    const netContributions = 3456;

    expect(calculateLifetimeReturn(totalValue, netContributions)).toStrictEqual({
      value: 900,
      percent: 0.2604166666666667,
    });
  });

  it('returns 0 for percent if contributions is 0', () => {
    const totalValue = 4356;
    const netContributions = 0;

    expect(calculateLifetimeReturn(totalValue, netContributions)).toStrictEqual({
      value: 4356,
      percent: 0,
    });
  });

  it('returns 0 for percent if contributions less than 0', () => {
    const totalValue = 4356;
    const netContributions = -10;

    expect(calculateLifetimeReturn(totalValue, netContributions)).toStrictEqual({
      value: 4366,
      percent: 0,
    });
  });

  it('returns 0 if contributions greater than total value', () => {
    const totalValue = 4356;
    const netContributions = 5000;

    expect(calculateLifetimeReturn(totalValue, netContributions)).toStrictEqual({
      value: 0,
      percent: 0,
    });
  });
});
