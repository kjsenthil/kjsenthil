import randomIntegersInRange from './randomIntegersInRange';

describe('Random integers in range', () => {
  it('Returns only whole numbers', () => {
    const actual = randomIntegersInRange(1, 100, 99);
    expect(actual).not.toBeEmpty();
    actual.forEach((number) => {
      expect(Number.isInteger(number)).toBeTrue();
    });
  });

  it('Returns unique numbers only', () => {
    const actual = randomIntegersInRange(1, 100, 99);
    expect(actual).not.toBeEmpty();
    const uniqueActuals = actual.filter((elem, index, self) => index === self.indexOf(elem));
    expect(uniqueActuals).toBeArrayOfSize(actual.length);
  });

  it('Returns numbers in order', () => {
    const actual = randomIntegersInRange(1, 100, 99);
    expect(actual).not.toBeEmpty();

    actual.forEach((current, index) => {
      if (index > 0) {
        expect(current).toBeGreaterThan(actual[index - 1]);
      }
    });
  });
});
