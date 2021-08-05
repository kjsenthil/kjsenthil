import * as React from 'react';
import { formatCurrency, CurrencyPresentationVariant } from '../../../utils/formatters';
import { Typography } from '../../atoms';
import { FormInput } from '../../molecules';

import { GoalInputStyledCard } from './GoalInputCard.styles';

export interface GoalInputCardProps {
  type: 'monthly' | 'upfront';
  onTrack: number;
  value: number | '';
  onChange: (name: string, newValue: number | '') => void;
  onBlur?: () => void;
}

const GoalInputCard = ({ type, onTrack, value, onChange }: GoalInputCardProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value === '' ? '' : Number(event.target.value);
    onChange(event.target.name, newValue);
  };

  const formattedOnTrack = formatCurrency(onTrack, CurrencyPresentationVariant.ACTUAL_TOPLINE);

  return (
    <GoalInputStyledCard>
      <Typography color="black" colorShade="dark" variant="sh2" gutterBottom>
        {type === 'monthly' ? 'Additional monthly contribution' : 'Add cash or transfer in today'}
      </Typography>

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

      <FormInput
        label=""
        name={`goal-input-${type}`}
        type="number"
        hideNumberSpinButton
        fullWidth
        onChange={handleInputChange}
        value={value}
        inputProps={{ 'data-testid': `goal-input-${type}` }}
      />
    </GoalInputStyledCard>
  );
};

export default GoalInputCard;
