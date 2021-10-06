export function roundDownToNearest0s(n: number): number {
  if (Math.abs(n) < 10) {
    return 0;
  }

  const intN = Math.floor(n);

  const numberOfZeroes = `${intN}`.length - 1;
  const toBeDividedBy = Number(`1${'0'.repeat(numberOfZeroes)}`);

  return Math.floor(intN / toBeDividedBy) * toBeDividedBy;
}

export function roundUpToNearest0s(n: number): number {
  if (Math.abs(n) < 10) {
    return 10;
  }

  const intN = Math.ceil(n);

  const numberOfZeroes = `${intN}`.length - 1;
  const toBeDividedBy = Number(`1${'0'.repeat(numberOfZeroes)}`);

  return Math.ceil(intN / toBeDividedBy) * toBeDividedBy;
}
