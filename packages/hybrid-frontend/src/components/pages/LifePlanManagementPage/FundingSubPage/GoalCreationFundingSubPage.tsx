import * as React from 'react';
import { useSelector } from 'react-redux';
import { navigate, RouteComponentProps, useLocation } from '@reach/router';
import GoalCreationSubPageLayout from '../../../templates/GoalCreationSubPageLayout';
import FundingStepCardOne from './FundingStepCardOne';
import FundingStepCardTwo from './FundingStepCardTwo';
import { PerformanceDataPeriod } from '../../../../services/performance';
import { formatCurrency, CurrencyPresentationVariant } from '../../../../utils/formatters';
import { RootState } from '../../../../store';

interface GoalCreationFundingSubPageProps extends RouteComponentProps {
  renderContentSide: () => React.ReactNode;
  handleStatePensionSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
  shouldIncludeStatePension: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function GoalCreationFundingSubPage({
  renderContentSide,
  handleStatePensionSelection,
  shouldIncludeStatePension,
}: GoalCreationFundingSubPageProps) {
  const { hash: currentUrlHash } = useLocation();

  const { investmentAccounts } = useSelector((state: RootState) => state);

  const steps = ['#step-1', '#step-2'];

  React.useEffect(() => {
    if (!steps.includes(currentUrlHash)) {
      navigate(steps[0]);
    }
  }, [currentUrlHash]);

  const tableData = (investmentAccounts.data || []).map(
    ({ id, accountName = '', accountTotalHoldings, monthlyInvestment = 0 }) => ({
      id,
      accountName,
      accountTotalHoldings,
      monthlyInvestment,
    })
  );

  const footerData = [
    'TOTAL',
    formatCurrency(
      tableData.reduce((totalVal, currVal) => totalVal + (currVal.accountTotalHoldings || 0), 0),
      CurrencyPresentationVariant.ACTUAL_TOPLINE
    ),
    formatCurrency(
      tableData.reduce((totalVal, currVal) => totalVal + (currVal.monthlyInvestment || 0), 0),
      CurrencyPresentationVariant.ACTUAL_TOPLINE
    ),
  ];

  const stepCardOneElementRef = React.useRef<HTMLElement | null>(null);
  const stepCardTwoElementRef = React.useRef<HTMLElement | null>(null);

  const mainContentElements = [
    {
      hash: '#step-1',
      ref: stepCardOneElementRef,
      element: (
        <FundingStepCardOne
          ref={stepCardOneElementRef}
          accountsTableProps={{
            headerRow: [
              { value: 'ACCOUNT' },
              { value: 'TOTAL HOLDINGS' },
              { value: 'MONTHLY CONTRIBUTION' },
            ],
            dataRow: tableData,
            footerRow: footerData,
            period: PerformanceDataPeriod['5Y'],
          }}
        />
      ),
    },
    {
      hash: '#step-2',
      ref: stepCardTwoElementRef,
      element: (
        <FundingStepCardTwo
          ref={stepCardTwoElementRef}
          shouldIncludeStatePension={shouldIncludeStatePension}
          onChange={(event) => {
            handleStatePensionSelection(event);
            navigate('#step-2');
          }}
        />
      ),
    },
  ];

  return (
    <GoalCreationSubPageLayout
      currentUrlHash={currentUrlHash}
      contentMain={mainContentElements}
      contentSide={renderContentSide()}
    />
  );
}
