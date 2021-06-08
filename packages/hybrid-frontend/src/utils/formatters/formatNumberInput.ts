import { DEFAULT_LOCALE } from './locale';

const NUMBER_FORMAT_REGEX = /^(-?[\d,]*\.?\d*)$/;

/**
 * This function returns true only if the provided text contains digits, commas,
 * and at most 1 period and at most 1 minus sign (dash).
 *
 * If the text is empty, the function returns true. This allows the input to be
 * able to completely clear itself.
 */
function isInputValidNumber(inputValue: string): boolean {
  if (!inputValue) {
    return true;
  }

  return !!inputValue.match(NUMBER_FORMAT_REGEX);
}

type FormatNumberInputConfig = {
  locale?: string;
};

/**
 * This function formats the text input parameter if it's a valid number. Some
 * caveats:
 * - Only the integer portion of the text is formatted (i.e. the decimal portion
 *   that comes after the '.' is untouched. This allows users to type in stuff
 *   with many decimal zeroes like '0.00001' otherwise the formatter will
 *   automatically round these kind numbers to 0 immediately
 */
export default function formatNumberInput(
  inputValue: string,
  prevInputValue?: string | undefined,
  config: FormatNumberInputConfig = {}
): string {
  const { locale } = config;

  if (inputValue && inputValue !== '.' && inputValue !== '-') {
    if (isInputValidNumber(inputValue)) {
      const FORMAT = new Intl.NumberFormat(locale ?? DEFAULT_LOCALE);

      const zeroFormattedInputValue = inputValue.replace('-.', '-0.');

      const [integerPortion, decimalPortion] = zeroFormattedInputValue.split('.');

      const noCommaIntegerPortion = `${integerPortion}`.replace(/,+/g, '');
      const formattedIntegerPortion = FORMAT.format(Number(noCommaIntegerPortion));

      if (decimalPortion === undefined) {
        return formattedIntegerPortion;
      }

      return [formattedIntegerPortion, decimalPortion].join('.');
    }

    return prevInputValue ?? '';
  }

  return inputValue;
}

/**
 * This is a utility function used to create a number input formatter with
 * customized config. This is useful when we want to create a formatter function
 * to be used as callback or props etc.
 */
export function createFormatNumberInput(config: FormatNumberInputConfig = {}) {
  return (inputValue: string, prevInputValue?: string | undefined) =>
    formatNumberInput(inputValue, prevInputValue, config);
}
