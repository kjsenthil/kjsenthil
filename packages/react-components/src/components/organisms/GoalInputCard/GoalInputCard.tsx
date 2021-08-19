import * as React from 'react';
import {
  formatCurrency,
  CurrencyPresentationVariant,
  formatPercent,
  PercentPresentationVariant,
} from '../../../utils/formatters';
import { Typography, Spacer } from '../../atoms';
import { FormInput } from '../../molecules';

import { GoalInputStyledCard, SuggestionText } from './GoalInputCard.styles';

export interface GoalInputCardProps {
  type: 'monthly' | 'upfront';
  onTrack: number;
  onTrackPercentage: number;
  value?: number | '';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const GoalInputCard = ({
  type,
  onTrack,
  onTrackPercentage,
  value,
  onChange,
  onFocus,
  onBlur,
}: GoalInputCardProps) => {
  const formattedOnTrack = formatCurrency(onTrack, CurrencyPresentationVariant.ACTUAL_TOPLINE);
  const formattedOnTrackPercentage = formatPercent(
    onTrackPercentage,
    PercentPresentationVariant.PROJECTION
  );

  const suggestionText = (
    <SuggestionText>
      <Typography color="grey" variant="b2">
        {type === 'monthly' ? (
          <>
            Add <b>{formattedOnTrack}</b> per month to get 100% on track
          </>
        ) : (
          <>
            Invest an additional <b>{formattedOnTrack}</b> today to get 100% on track
          </>
        )}
      </Typography>
    </SuggestionText>
  );

  return (
    <GoalInputStyledCard>
      <Typography color="black" colorShade="dark" variant="sh2" gutterBottom>
        {type === 'monthly' ? 'Additional monthly contribution' : 'Add cash or transfer in today'}
      </Typography>

      {parseFloat(formattedOnTrackPercentage) < 100 ? suggestionText : <Spacer y={0} />}

      <FormInput
        label=""
        name={`goal-input-${type}`}
        type="number"
        hideNumberSpinButton
        fullWidth
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={String(value)}
        inputProps={{ 'data-testid': `goal-input-${type}` }}
        shouldDelayOnChange
      />
    </GoalInputStyledCard>
  );
};

export default GoalInputCard;
