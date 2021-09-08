import { AccountFilterSelection, InvestmentAccount } from '@tswdts/react-components';
import { BasicInvestmentSummary } from '../../services/myAccount';
import { AnnualisedReturnsResponse } from '../../services/returns';
import useAnnualisedReturnSummary from '../useAnnualisedReturnSummary';
import useInvestmentAccounts from '../useInvestmentAccounts';
import useStateIsAvailable from '../useStateIsAvailable';
import useStateIsLoading from '../useStateIsLoading';

interface SummaryValues {
  accountsSummary: BasicInvestmentSummary;
  investmentAccounts?: InvestmentAccount[];
  hasLinkedAccounts: boolean;
  annualisedReturnSummary?: AnnualisedReturnsResponse;
  summaryContributions: number;
  summaryIsLoading: boolean;
}

const useSummaryValues = (
  selectedFilter: AccountFilterSelection,
  shouldDispatchInvestmentAccounts: boolean = false,
  shouldDispatchAnnualisedReturnSummary: boolean = true
): SummaryValues => {
  const { accountsSummary, investmentAccounts, hasLinkedAccounts } = useInvestmentAccounts(
    { shouldDispatch: shouldDispatchInvestmentAccounts },
    selectedFilter
  );
  const { annualisedReturnSummary } = useAnnualisedReturnSummary({
    shouldDispatch: shouldDispatchAnnualisedReturnSummary,
  });

  const isAnnualisedReturnSummaryLoading = useStateIsLoading('annualisedReturnSummary');
  const isAnnualisedReturnSummaryAvailable = useStateIsAvailable('annualisedReturnSummary');
  const isPerformanceLoading = useStateIsLoading('performance');

  const summaryIsLoading = isAnnualisedReturnSummaryLoading || isPerformanceLoading;

  const summaryContributions =
    investmentAccounts?.reduce(
      (totalContribution, account) => account.accountTotalNetContribution + totalContribution,
      0
    ) || 0;

  return {
    accountsSummary,
    investmentAccounts,
    hasLinkedAccounts,
    annualisedReturnSummary: isAnnualisedReturnSummaryAvailable
      ? annualisedReturnSummary
      : undefined,
    summaryContributions,
    summaryIsLoading,
  };
};

export default useSummaryValues;
