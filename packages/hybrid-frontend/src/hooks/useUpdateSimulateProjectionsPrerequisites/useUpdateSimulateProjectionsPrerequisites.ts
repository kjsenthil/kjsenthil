import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { InvestmentAccountData, RiskModel } from '@tswdts/react-components';

import {
  extractClientAccounts,
  extractInvestmentAccountDataByAccounts,
} from '../../services/myAccount';
import {
  AssetModelResponse,
  SimulateProjectionsPrerequisitePayload,
  getAssetModel,
  getPortfolioAssetAllocation,
  getPortfolioRiskProfile,
  PortfolioRiskProfile,
  PortfolioAssetAllocationData,
} from '../../services/projections';
import useAllAssets from '../../services/assets/hooks/useAllAssets';
import { RootState } from '../../store';

const useUpdateSimulateProjectionsPrerequisites = (): Partial<SimulateProjectionsPrerequisitePayload> => {
  const { client, investmentSummary, investmentAccounts } = useSelector(
    (state: RootState) => state
  );

  const fundData = useAllAssets();
  const [assetModel, setAssetModel] = useState<AssetModelResponse>();
  const [riskProfile, setRiskProfile] = useState<PortfolioRiskProfile>();
  const [
    portfolioAssetAllocation,
    setPortfolioAssetAllocation,
  ] = useState<PortfolioAssetAllocationData>();
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
        setPortfolioAssetAllocation(await getPortfolioAssetAllocation(accountTotals));
      }
    })();
  }, [accountTotals]);

  useEffect(() => {
    (async () => {
      if (investmentSummary.data && investmentAccounts.data && client.included && !accountTotals) {
        const clientAccounts = extractClientAccounts(client.included);
        setAccountTotals(
          await extractInvestmentAccountDataByAccounts(
            investmentSummary.data,
            clientAccounts,
            investmentAccounts.data
          )
        );
      }
    })();
  }, [investmentSummary.data, client.included, accountTotals, investmentAccounts.data]);

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
      if (
        portfolioAssetAllocation?.portfolioCashPercentage !== undefined &&
        portfolioAssetAllocation.portfolioCashPercentage === 100 &&
        !riskProfile
      ) {
        setAssetModel(
          (): AssetModelResponse => ({
            erValue: 0,
            volatility: 0,
            riskModel: RiskModel.TAA1,
            id: 0,
            zScores: { lessLikelyUb: 0, lessLikleyLb: 0, moreLikelyLb: 0, moreLikelyUb: 0 },
          })
        );
      } else if (
        portfolioAssetAllocation?.portfolioEquityPercentage !== undefined &&
        !riskProfile
      ) {
        setRiskProfile(
          await getPortfolioRiskProfile({
            portfolioEquityPercentage: portfolioAssetAllocation?.portfolioEquityPercentage ?? 0,
            equityFunds: fundData.allAsset.nodes,
          })
        );
      }
    })();
  }, [fundData, portfolioAssetAllocation, riskProfile]);

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

export default useUpdateSimulateProjectionsPrerequisites;
