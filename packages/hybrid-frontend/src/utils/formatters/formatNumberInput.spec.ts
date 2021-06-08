import formatNumberInput, { createFormatNumberInput } from './formatNumberInput';

describe('formatNumberInput', () => {
  describe('input is valid number', () => {
    const testCases = [
      ['', ''],
      ['.', '.'],
      ['-', '-'],
      ['-.', '-0.'],
      ['.123', '0.123'],
      ['-.123', '-0.123'],
      ['123', '123'],
      ['123456', '123,456'],
      ['123456.1234', '123,456.1234'],
      ['-123456.1234', '-123,456.1234'],
    ];

    test.each(testCases)(
      'The function works as expected when input value is %p',
      (inputValue, expectedResult) => {
        expect(formatNumberInput(inputValue)).toBe(expectedResult);
      }
    );
  });

  // We expect the function to return the previous input value when the current
  // input value is not a valid number (and not an empty string or a single
  // period '.' or a single dash '-' (negative)).
  describe('input is invalid number', () => {
    const testCases = [
      ['a', undefined, ''],
      ['a', 'some message', 'some message'],
    ];

    test.each(testCases)(
      'The function works as expected when input value is %p and previous input value is %p',
      (inputValue, prevInputValue, expectedResult) => {
        expect(formatNumberInput(inputValue as string, prevInputValue as string)).toBe(
          expectedResult
        );
      }
    );
  });
});

describe('createFormatNumberInput', () => {
  it('returns a formatter as expected', () => {
    const formatter = createFormatNumberInput();

    expect(formatter('1234')).toBe('1,234');
  });
});
