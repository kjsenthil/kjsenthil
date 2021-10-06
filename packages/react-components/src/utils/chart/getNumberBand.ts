export interface GetNumberBandProps {
  min: number;
  max: number;
  step: number;
}

/**
 * Return a range of numbers as an array (inclusive of the min and the max
 * values.
 */
export default function getNumberBand({ min, max, step }: GetNumberBandProps): number[] {
  const band: number[] = [];

  for (let i = min; i <= max; i += step) {
    band.push(i);
  }

  return band;
}
