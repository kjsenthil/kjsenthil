import getSliderWithInputInfoText from './getSliderWithInputInfoText';

describe('getSliderWithInputInfoText', () => {
  const min = 0;
  const max = 100;

  it('returns the appropriate message when value exceeds max', () => {
    expect(getSliderWithInputInfoText({ min, max, value: 101 })).toBe(
      `Please input a number smaller than ${max}`
    );
  });

  it('returns the appropriate message when value is lower than min', () => {
    expect(getSliderWithInputInfoText({ min, max, value: -1 })).toBe(
      `Please input a number larger than ${min}`
    );
  });

  it('returns undefined when value is within the min-max range', () => {
    expect(getSliderWithInputInfoText({ min, max, value: 50 })).toBeUndefined();
  });
});
