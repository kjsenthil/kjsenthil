import React from 'react';
import { Typography, ProgressBar, Spacer, Grid, useTheme } from '../../atoms';
import { formatCurrency, CurrencyPresentationVariant } from '../../../utils/formatters';
import { IsaValues, IsaAllownceContainer } from './IsaAllowance.styles';
import { useBreakpoint } from '../../../hooks';

export interface IsaAllowanceProps {
  title: string;
  totalAllowance: number;
  contributions: number;
}
const IsaAllowance = ({ title, totalAllowance, contributions }: IsaAllowanceProps) => {
  const theme = useTheme();
  const { isMobile } = useBreakpoint();
  const progressBarBackgrounds = [`${theme.palette.primary.dark}`];

  const formattedTotalAllowance = formatCurrency(
    totalAllowance,
    CurrencyPresentationVariant.ACTUAL_TOPLINE
  );
  const formattedContributions = formatCurrency(
    contributions,
    CurrencyPresentationVariant.ACTUAL_TOPLINE
  );
  return (
    <Grid item xs={isMobile ? 12 : 12}>
      <IsaAllownceContainer>
        <Typography variant="sh5" color="grey" colorShade="dark1" spaceNoWrap>
          {title}
        </Typography>
        <Spacer y={1} />
        <ProgressBar
          progress={contributions / totalAllowance}
          barBackgrounds={progressBarBackgrounds}
        />
        <Spacer y={1} />
        <IsaValues>
          <Typography color="primary" colorShade="dark2" variant="sh1">
            {formattedContributions}&nbsp;
          </Typography>
          <Typography color="primary" colorShade="dark2" variant="sh1">
            <b> / {formattedTotalAllowance}</b>
          </Typography>
        </IsaValues>
      </IsaAllownceContainer>
    </Grid>
  );
};

export default IsaAllowance;
