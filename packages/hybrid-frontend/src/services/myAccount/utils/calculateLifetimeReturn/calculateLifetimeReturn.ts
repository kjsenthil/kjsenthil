const calculateLifetimeReturn = (
  totalValue: number,
  netContributions: number
): { value: number; percent: number } => {
  const value = totalValue - netContributions;
  const percent = value > 0 && netContributions > 0 ? value / netContributions : 0;

  return { value, percent };
};

export default calculateLifetimeReturn;
