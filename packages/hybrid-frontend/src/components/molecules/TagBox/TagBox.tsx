import * as React from 'react';
import { Typography } from '../../atoms';
import { PercentageTag, LabelTag, BadgeTag } from './TagBox.styles';
import { Counter } from '../../particles';

export interface TagBoxProps {
  variant: 'percentage' | 'label' | 'badge';
  children: string | number;
  formatter?: (num: number) => string;
  shouldAnimate?: boolean;
}

const TagBox = ({ variant, children, formatter, shouldAnimate = false }: TagBoxProps) => {
  const value = typeof formatter === 'function' ? formatter(Number(children)) : children;
  switch (variant) {
    case 'percentage':
      return (
        <PercentageTag color={Number(children) > 0 ? 'success' : 'gold'}>
          <Typography variant="sh4" color="white">
            {shouldAnimate ? (
              <Counter valueFormatter={formatter} value={Number(children)} />
            ) : (
              value
            )}
          </Typography>
        </PercentageTag>
      );
    case 'label':
      return (
        <LabelTag>
          <Typography variant="sh4">{value}</Typography>
        </LabelTag>
      );
    case 'badge':
      return (
        <BadgeTag>
          <Typography variant="sh4" color="tertiary">
            {value}
          </Typography>
        </BadgeTag>
      );
    default:
      return null;
  }
};

export default TagBox;
