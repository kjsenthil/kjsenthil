export default function getSliderWithInputInfoText({
  min,
  max,
  value,
}: {
  min: number;
  max: number;
  value: number;
}): string | undefined {
  if (value < min) {
    return `Please input a number larger than ${min}`;
  }

  if (value > max) {
    return `Please input a number smaller than ${max}`;
  }

  return undefined;
}
