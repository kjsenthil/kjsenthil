/**
 * Add (or minus) some sort of buffer to the max (or min) value on for the
 * performance chart's value range.
 */
export default function getBufferNumber(number: number, buffer: number = 5): number {
  const absNumber = Math.abs(number);

  if (absNumber < 10) return buffer;

  const countOfZeroes = `${Math.trunc(absNumber)}`.length - 2;

  return Number(`${buffer}${'0'.repeat(countOfZeroes)}`);
}
