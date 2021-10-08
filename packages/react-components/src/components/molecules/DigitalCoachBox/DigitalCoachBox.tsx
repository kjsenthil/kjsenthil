import * as React from 'react';
import { Typography, TypographyProps } from '../../atoms';
import TypographyWithTooltip from '../TypographyWithTooltip';
import {
  DigitalCoachBoxContainer,
  DigitalCoachIcon,
  Title,
  TitleContainer,
} from './DigitalCoachBox.styles';

export interface DigitalCoachBoxProps {
  description: string | React.ReactElement;
  title: string;
  tooltip?: string;
}

const DigitalCoachBox = ({ description, title, tooltip }: DigitalCoachBoxProps) => {
  const descriptionTypographyProps: TypographyProps = {
    color: 'primary',
    colorShade: 'dark2',
    variant: 'b5',
  };

  return (
    <DigitalCoachBoxContainer>
      <TitleContainer>
        <DigitalCoachIcon name="dogBark" />
        <Title color="primary" variant="sh4">
          {title}
        </Title>
      </TitleContainer>
      {tooltip ? (
        <TypographyWithTooltip tooltip={tooltip} typographyProps={descriptionTypographyProps}>
          {description}
        </TypographyWithTooltip>
      ) : (
        <Typography {...descriptionTypographyProps}>{description}</Typography>
      )}
    </DigitalCoachBoxContainer>
  );
};

export default DigitalCoachBox;
