const calculateLifetimeReturn = (
  totalValue: number,
  netContributions: number
): { value: number; percent: number } => {
  const value = totalValue >= netContributions ? totalValue - netContributions : 0;
  const percent = netContributions > 0 ? value / netContributions : 0;

  return { value, percent };
};

export default calculateLifetimeReturn;
