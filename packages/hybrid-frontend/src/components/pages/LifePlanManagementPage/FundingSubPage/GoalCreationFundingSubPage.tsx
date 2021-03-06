import * as React from 'react';
import { useSelector } from 'react-redux';
import { navigate, RouteComponentProps, useLocation } from '@reach/router';
import {
  CurrencyPresentationVariant,
  GoalInputCard,
  PerformanceDataPeriod,
  Spacer,
  formatCurrency,
  DisabledComponent,
} from '@tswdts/react-components';
import GoalCreationSubPageLayout from '../../../templates/GoalCreationSubPageLayout';
import FundingStepCardOne from './FundingStepCardOne';
import FundingStepCardTwo from './FundingStepCardTwo';
import FundingDisclaimer from './FundingDisclaimer';
import { RootState } from '../../../../store';
import { GoalInput } from './GoalCreationFundingSubPage.styles';
import { useFeatureFlagToggle } from '../../../../hooks';
import { FeatureFlagNames } from '../../../../constants';

interface GoalCreationFundingSubPageProps extends RouteComponentProps {
  renderContentSide: () => React.ReactNode;
  handleStatePensionSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
  shouldIncludeStatePension: boolean;
  additionalMonthlyContributions: number;
  monthlyContributionsRequiredToFundDrawdown: number;
  handleAdditionalMonthlyContributions: (e: React.ChangeEvent<HTMLInputElement>) => void;
  upfrontContribution: number;
  upfrontContributionRequiredToFundDrawdown: number;
  handleUpfrontContribution: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTrackPercentage: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function GoalCreationFundingSubPage({
  renderContentSide,
  handleStatePensionSelection,
  shouldIncludeStatePension,
  additionalMonthlyContributions,
  monthlyContributionsRequiredToFundDrawdown,
  handleAdditionalMonthlyContributions,
  upfrontContribution,
  upfrontContributionRequiredToFundDrawdown,
  handleUpfrontContribution,
  onTrackPercentage,
}: GoalCreationFundingSubPageProps) {
  const { hash: currentUrlHash } = useLocation();

  const { investmentAccounts } = useSelector((state: RootState) => state);

  const steps = ['#step-1', '#step-2', '#goal-input'];

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

  const experimentalFeature = useFeatureFlagToggle(FeatureFlagNames.EXP_FEATURE);
  const isExperimentalFeatureEnabled = !!experimentalFeature?.isEnabled;

  const DisabledExperimental = ({ children }: { children: React.ReactNode }) => {
    if (isExperimentalFeatureEnabled) {
      return <>{children}</>;
    }
    return (
      <DisabledComponent placement="top" arrow title="Coming soon">
        {children}
      </DisabledComponent>
    );
  };

  const stepCardOneElementRef = React.useRef<HTMLElement | null>(null);
  const stepCardTwoElementRef = React.useRef<HTMLElement | null>(null);
  const goalInputElementRef = React.useRef<HTMLDivElement | null>(null);
  const disclaimerElementRef = React.useRef<HTMLElement | null>(null);

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
        <DisabledExperimental>
          <FundingStepCardTwo
            ref={stepCardTwoElementRef}
            shouldIncludeStatePension={shouldIncludeStatePension}
            onChange={(event) => {
              handleStatePensionSelection(event);
              navigate('#step-2');
            }}
          />
        </DisabledExperimental>
      ),
    },
    {
      hash: '#goal-input',
      ref: goalInputElementRef,
      element: (
        <GoalInput ref={goalInputElementRef}>
          <GoalInputCard
            type="upfront"
            value={upfrontContribution}
            onTrack={upfrontContributionRequiredToFundDrawdown}
            onTrackPercentage={onTrackPercentage}
            onChange={(event) => {
              handleUpfrontContribution(event);
            }}
            onFocus={() => {
              navigate('#goal-input');
            }}
          />
          <Spacer x={1} />
          <GoalInputCard
            type="monthly"
            value={additionalMonthlyContributions}
            onTrack={monthlyContributionsRequiredToFundDrawdown}
            onTrackPercentage={onTrackPercentage}
            onChange={(event) => {
              handleAdditionalMonthlyContributions(event);
            }}
            onFocus={() => {
              navigate('#goal-input');
            }}
          />
        </GoalInput>
      ),
    },
    {
      hash: '#disclaimer',
      ref: disclaimerElementRef,
      element: <FundingDisclaimer />,
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
