import getBreakdownAllocation, { BreakdownAllocationErrors } from './getBreakdownAllocation';

const getEquityAndCashAllocation = async (
  accountId: string
): Promise<{ equityPercentage: number; cashPercentage: number }> => {
  let equityPercentage = 0;
  let cashPercentage = 0;

  try {
    const breakdownAllocationResponse = await getBreakdownAllocation(accountId);
    const breakdown = breakdownAllocationResponse?.data.attributes?.breakdown;

    if (breakdown) {
      equityPercentage =
        breakdown.find((allocation) => allocation.name === 'Equity')?.percentage ?? 0;
      cashPercentage =
        breakdown.find((allocation) => allocation.name === 'Uninvested Cash')?.percentage ?? 0;
    }
  } catch (e) {
    // use an equity percentage of 0 for accounts with no equities
    if (e.message === BreakdownAllocationErrors.NO_EQUITIES_ERROR) {
      equityPercentage = 0;
      cashPercentage = 0;
    } else {
      throw e;
    }
  }

  return { equityPercentage, cashPercentage };
};

export default getEquityAndCashAllocation;
