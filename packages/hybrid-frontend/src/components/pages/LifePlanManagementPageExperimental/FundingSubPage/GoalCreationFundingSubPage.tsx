import * as React from 'react';
import { RouteComponentProps, useLocation } from '@reach/router';
import GoalCreationSubPageLayout from '../../../templates/GoalCreationSubPageLayoutExperimental';
import FundingStepCardOne from './FundingStepCardOne';
import FundingStepCardTwo from './FundingStepCardTwo';
import { PerformanceDataPeriod } from '../../../../services/performance';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function GoalCreationFundingSubPage(_: RouteComponentProps) {
  const { hash: currentUrlHash } = useLocation();

  const stepCardOneElementRef = React.useRef<HTMLElement | null>(null);
  const stepCardTwoElementRef = React.useRef<HTMLElement | null>(null);

  const elements = [
    {
      hash: '#step-1',
      ref: stepCardOneElementRef,
      element: (
        <FundingStepCardOne
          accountsTableProps={{
            headerRow: [
              { value: 'ACCOUNT' },
              { value: 'TOTAL HOLDINGS' },
              { value: 'MONTHLY CONTRIBUTION' },
            ],
            dataRow: [],
            period: PerformanceDataPeriod['1M'],
          }}
        />
      ),
    },

    {
      hash: '#step-2',
      ref: stepCardTwoElementRef,
      element: <FundingStepCardTwo includeStatePension />,
    },
  ];

  return (
    <GoalCreationSubPageLayout
      currentUrlHash={currentUrlHash}
      contentMain={elements}
      contentSide={<div>Chart and bar</div>}
    />
  );
}
