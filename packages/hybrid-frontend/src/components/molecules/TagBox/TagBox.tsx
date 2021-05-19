import * as React from 'react';
import { Typography } from '../../atoms';
import { PercentageTag, LabelTag, BadgeTag } from './TagBox.styles';

export interface TagBoxProps {
  variant: 'percentage' | 'label' | 'badge';
  children: string | number;
  formatter?: (num: number) => string;
}

const TagBox = ({ variant, children, formatter }: TagBoxProps) => {
  const value = typeof formatter === 'function' ? formatter(Number(children)) : children;
  switch (variant) {
    case 'percentage':
      return (
        <PercentageTag color={Number(children) > 0 ? 'success' : 'gold'}>
          <Typography variant="sh4" color="white">
            {value}
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
