export interface PrependValuePlusMinusProps {
  formattedValue: string;
  value: number;
  displayPlus?: boolean;
  injectSpaceAfterPlusMinus?: boolean;
}

export default function prependValuePlusMinus({
  formattedValue,
  value,
  displayPlus,
  injectSpaceAfterPlusMinus,
}: PrependValuePlusMinusProps) {
  const space = injectSpaceAfterPlusMinus ? ' ' : '';

  if (value < 0) {
    return `-${space}${formattedValue}`;
  }

  if (displayPlus && value >= 0) {
    return `+${space}${formattedValue}`;
  }

  return formattedValue;
}
