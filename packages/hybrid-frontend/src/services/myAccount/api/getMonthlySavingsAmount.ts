import getMonthlySavings, { MonthlySavingsErrors } from './getMonthlySavings';

const getMonthlySavingsAmount = async (accountId: string): Promise<number> => {
  let monthlySavingsAmount: number;

  try {
    const reponse = await getMonthlySavings(accountId);
    monthlySavingsAmount = reponse.data[0].attributes.amount;
  } catch (e) {
    // use a monthly savings amount of 0 for accounts with no monthly savings
    if (e.message === MonthlySavingsErrors.NO_SAVINGS_ERROR) {
      monthlySavingsAmount = 0;
    } else {
      throw e;
    }
  }

  return monthlySavingsAmount;
};

export default getMonthlySavingsAmount;
