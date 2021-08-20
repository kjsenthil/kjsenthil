import * as React from 'react';
import {
  CurrencyPresentationVariant,
  formatCurrency,
  formatPercent,
  PercentPresentationVariant,
  Typography,
} from '@tswdts/react-components';

export interface TitleProps {
  onTrackPercentage: number;

  // Provide both of these to display the title as the Single-Goal view
  // variant
  onTrackAmount?: number | undefined;
  onTrackAmountMarketUnderperform?: number | undefined;
}

export default function Title({
  onTrackPercentage,
  onTrackAmount,
  onTrackAmountMarketUnderperform,
}: TitleProps) {
  const formattedOnTrackPercentage = formatPercent(
    onTrackPercentage,
    PercentPresentationVariant.PROJECTION
  );

  if (onTrackAmount !== undefined && onTrackAmountMarketUnderperform !== undefined) {
    const formattedOnTrackAmount = formatCurrency(
      onTrackAmount,
      CurrencyPresentationVariant.PROJECTION
    );
    const formattedOnTrackAmountMarketUnderperform = formatCurrency(
      onTrackAmountMarketUnderperform,
      CurrencyPresentationVariant.PROJECTION
    );

    return (
      <Typography color="primary" colorShade="dark2" variant="h3" component="h1">
        You&#39;re on track to have {formattedOnTrackPercentage} of your target. That&#39;s{' '}
        {formattedOnTrackAmount} or {formattedOnTrackAmountMarketUnderperform} if markets
        underperform.
      </Typography>
    );
  }

  return (
    <Typography color="primary" colorShade="dark2" variant="h2" component="h1">
      You&#39;re on track to have {formattedOnTrackPercentage} across all your goals.
    </Typography>
  );
}
