import getMyAccountBreakdownAllocation, {
  BreakdownAllocationErrors,
} from './getMyAccountBreakdownAllocation';

const getMyAccountEquityAllocation = async (accountId: string): Promise<number | undefined> => {
  let equityPercentage: number | undefined;

  try {
    const breakdown = await getMyAccountBreakdownAllocation(accountId);
    equityPercentage = breakdown.data.attributes.breakdown.find(
      (allocation) => allocation.name === 'Equity'
    )?.percentage;
  } catch (e) {
    // use an equity percentage of 0 for accounts with no equities
    if (e.message === BreakdownAllocationErrors.NO_EQUITIES_ERROR) {
      equityPercentage = 0;
    } else {
      throw e;
    }
  }

  return equityPercentage;
};

export default getMyAccountEquityAllocation;
