const randomIntegersInRange = (min: number, max: number, toChoose: number): number[] => {
  const output = new Set<number>();

  while (output.size < toChoose || output.size === max) {
    output.add(Math.floor(Math.random() * (max - min + 1) + min));
  }
  return Array.from(output).sort((a, b) => a - b);
};

export default randomIntegersInRange;
