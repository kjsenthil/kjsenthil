import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  extractClientAccounts,
  extractInvestmentAccountDataByAccounts,
} from '../../services/myAccount';
import {
  AssetModelResponse,
  CurrentProjectionsPrerequisitePayload,
  getAssetModel,
  getPortfolioAssetAllocation,
  getPortfolioRiskProfile,
  PortfolioRiskProfile,
} from '../../services/projections';
import useAllAssets from '../../services/assets/hooks/useAllAssets';
import { RootState } from '../../store';
import { InvestmentAccountData } from '../../services/types';

const useUpdateCurrentProjectionsPrerequisites = (): Partial<CurrentProjectionsPrerequisitePayload> => {
  const { client, investmentSummary, investmentAccounts } = useSelector(
    (state: RootState) => state
  );

  const fundData = useAllAssets();
  const [assetModel, setAssetModel] = useState<AssetModelResponse>();
  const [riskProfile, setRiskProfile] = useState<PortfolioRiskProfile>();
  const [portfolioEquityPercentage, setPortfolioEquityPercentage] = useState<undefined | number>(
    undefined
  );
  const [portfolioCurrentValue, setPortfolioCurrentValue] = useState<undefined | number>(undefined);
  const [monthlyContributions, setMonthlyContributions] = useState<undefined | number>(undefined);
  const [totalNetContributions, setTotalNetContributions] = useState<undefined | number>(undefined);
  const [accountTotals, setAccountTotals] = useState<InvestmentAccountData[]>();

  useEffect(() => {
    setTotalNetContributions(
      (investmentAccounts.data || []).reduce(
        (totalContributions, { accountTotalNetContribution }) =>
          accountTotalNetContribution + totalContributions,
        0
      ) || 0
    );
  }, [investmentAccounts]);

  useEffect(() => {
    (async () => {
      if (accountTotals) {
        setPortfolioEquityPercentage(await getPortfolioAssetAllocation(accountTotals));
      }
    })();
  }, [accountTotals]);

  useEffect(() => {
    (async () => {
      if (investmentSummary.data && client.included && !accountTotals) {
        const clientAccounts = extractClientAccounts(client.included);
        setAccountTotals(
          await extractInvestmentAccountDataByAccounts(investmentSummary.data, clientAccounts)
        );
      }
    })();
  }, [investmentSummary.data, client.included, accountTotals]);

  useEffect(() => {
    if (accountTotals) {
      const { accountsMonthlyContributions, accountsPortfolioCurrentValue } = accountTotals.reduce(
        (acc, account) => {
          acc.accountsPortfolioCurrentValue += account.accountTotalHoldings || 0;
          acc.accountsMonthlyContributions += account.monthlyInvestment || 0;
          return acc;
        },
        { accountsMonthlyContributions: 0, accountsPortfolioCurrentValue: 0 }
      );

      setPortfolioCurrentValue(accountsPortfolioCurrentValue);
      setMonthlyContributions(accountsMonthlyContributions);
    }
  }, [accountTotals]);

  useEffect(() => {
    (async () => {
      if (portfolioEquityPercentage !== undefined && !riskProfile) {
        setRiskProfile(
          await getPortfolioRiskProfile({
            portfolioEquityPercentage,
            equityFunds: fundData.allAsset.nodes,
          })
        );
      }
    })();
  }, [fundData, portfolioEquityPercentage, riskProfile]);

  useEffect(() => {
    (async () => {
      if (riskProfile !== undefined && !assetModel) {
        setAssetModel(await getAssetModel(riskProfile.riskModel));
      }
    })();
  }, [riskProfile, assetModel]);

  return {
    portfolioCurrentValue,
    monthlyContributions,
    assetModel,
    riskProfile,
    totalNetContributions,
  };
};

export default useUpdateCurrentProjectionsPrerequisites;
