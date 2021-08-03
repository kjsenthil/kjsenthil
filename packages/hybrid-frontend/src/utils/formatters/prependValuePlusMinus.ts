export default function prependValuePlusMinus(
  formattedValue: string,
  value: number,
  displayPlus: boolean,
  injectSpaceAfterPlusMinus: boolean
) {
  const space = injectSpaceAfterPlusMinus ? ' ' : '';

  if (value < 0) {
    return `-${space}${formattedValue}`;
  }

  if (displayPlus && value >= 0) {
    return `+${space}${formattedValue}`;
  }

  return formattedValue;
}
