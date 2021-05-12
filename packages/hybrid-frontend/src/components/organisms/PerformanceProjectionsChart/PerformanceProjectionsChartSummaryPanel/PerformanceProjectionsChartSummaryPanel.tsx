import * as React from 'react';
import { Spacer, Typography } from '../../../atoms';
import { Container, SectionContainer } from './PerformanceProjectionsChartSummaryPanel.styles';
import { formatCurrency } from '../../../../utils/formatters';
import PerformancePathLabel from './PerformancePathLabel';
import LikelyRangeAreaLabel from './LikelyRangeAreaLabel';
import ContributionsPathLabel from './ContributionsPathLabel';
import GoalNotMetPathLabel from './GoalNotMetPathLabel';

export interface PerformanceProjectionsChartSummaryPanelProps {
  performance: number;
  performanceLowEnd: number;
  performanceHighEnd: number;
  contributions: number;

  // Only available if the goal is not met
  performanceTargetNotMet: number | undefined;
}

export default function PerformanceProjectionsChartSummaryPanel({
  performance,
  performanceLowEnd,
  performanceHighEnd,
  contributions,
  performanceTargetNotMet,
}: PerformanceProjectionsChartSummaryPanelProps) {
  return (
    <Container>
      <SectionContainer>
        <PerformancePathLabel />

        <div>
          <Typography variant="sh4" color="grey" colorShade="dark1">
            PAST / PROJECTED VALUE
          </Typography>
          <Typography variant="sh4" color="primary" colorShade="dark2">
            {formatCurrency(performance)}
          </Typography>
        </div>
      </SectionContainer>

      <Spacer asDivider />

      <SectionContainer>
        <LikelyRangeAreaLabel />

        <div>
          <Typography variant="sh4" color="grey" colorShade="dark1">
            LIKELY RANGE
          </Typography>
          <Typography variant="sh4" color="primary" colorShade="dark2">
            {formatCurrency(performanceLowEnd, 'GBP', {
              opts: {
                // Need to set both else Jest will throw an error:
                // https://github.com/andyearnshaw/Intl.js/issues/123
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              },
            })}{' '}
            -{' '}
            {formatCurrency(performanceHighEnd, 'GBP', {
              opts: {
                // Need to set both else Jest will throw an error:
                // https://github.com/andyearnshaw/Intl.js/issues/123
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              },
            })}
          </Typography>
        </div>
      </SectionContainer>

      {performanceTargetNotMet !== undefined && (
        <>
          <Spacer asDivider />

          <SectionContainer>
            <GoalNotMetPathLabel />

            <div>
              <Typography variant="sh4" color="grey" colorShade="dark1">
                TARGET VALUE
              </Typography>
              <Typography variant="sh4" color="primary" colorShade="dark2">
                {formatCurrency(performanceTargetNotMet, 'GBP', {
                  opts: {
                    // Need to set both else Jest will throw an error:
                    // https://github.com/andyearnshaw/Intl.js/issues/123
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                  },
                })}
              </Typography>
            </div>
          </SectionContainer>
        </>
      )}

      <Spacer asDivider />

      <SectionContainer>
        <ContributionsPathLabel />

        <div>
          <Typography variant="sh4" color="grey" colorShade="dark1">
            CONTRIBUTIONS
          </Typography>
          <Typography variant="sh4" color="primary" colorShade="dark2">
            {formatCurrency(contributions)}
          </Typography>
        </div>
      </SectionContainer>
    </Container>
  );
}
