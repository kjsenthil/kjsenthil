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
  description: string;
  title: string;
  tooltip?: string;
}

const DigitalCoachBox = ({ description, title, tooltip }: DigitalCoachBoxProps) => {
  const descriptionTypographyProps: TypographyProps = {
    color: 'grey',
    colorShade: 'dark1',
    variant: 'b3',
  };

  return (
    <DigitalCoachBoxContainer>
      <TitleContainer>
        <DigitalCoachIcon name="dogBark" />
        <Title color="secondary" colorShade="light1" variant="sh4">
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
