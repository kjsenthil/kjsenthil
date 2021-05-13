import * as React from 'react';
import { Spacer, Typography } from '../../../atoms';
import {
  Container,
  ContributionsLabelIndicator,
  Divider,
  PerformanceLabelIndicator,
  PerformancePercentage,
  SectionContainer,
} from './PerformanceChartSummaryPanel.styles';
import { formatCurrency, formatPercent } from '../../../../utils/formatters';

export interface PerformanceChartSummaryPanelProps {
  totalPerformance: number;
  totalContributions: number;

  totalReturn: number;
  totalReturnPct: number;
}

export default function PerformanceChartSummaryPanel({
  totalPerformance,
  totalContributions,
  totalReturn,
  totalReturnPct,
}: PerformanceChartSummaryPanelProps) {
  return (
    <Container>
      <SectionContainer>
        <PerformanceLabelIndicator />

        <div>
          <Typography variant="sh4" color="grey" colorShade="dark1">
            TOTAL VALUE
          </Typography>
          <Spacer x={1} />
          <Typography variant="sh4" color="primary" colorShade="dark2">
            {formatCurrency(totalPerformance)}
          </Typography>
        </div>
      </SectionContainer>

      <Divider />

      <SectionContainer>
        <ContributionsLabelIndicator />

        <div>
          <Typography variant="sh4" color="grey" colorShade="dark1">
            TOTAL CONTRIBUTED
          </Typography>
          <Spacer x={1} />
          <Typography variant="sh4" color="primary" colorShade="dark2">
            {formatCurrency(totalContributions)}
          </Typography>
        </div>
      </SectionContainer>

      <Divider />

      <SectionContainer>
        <div>
          <Typography variant="sh4" color="grey" colorShade="dark1">
            TOTAL RETURN
          </Typography>
          <Spacer x={1} />
          <div>
            <Typography display="inline" variant="sh4" color="primary" colorShade="dark2">
              {formatCurrency(totalReturn)}
            </Typography>
            <PerformancePercentage>
              <Typography variant="sh4" color="white">
                {formatPercent(totalReturnPct)}
              </Typography>
            </PerformancePercentage>
          </div>
        </div>
      </SectionContainer>
    </Container>
  );
}