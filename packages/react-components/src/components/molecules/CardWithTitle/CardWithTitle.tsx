import React, { FunctionComponent } from 'react';
import { Typography, Spacer } from '../../atoms';
import StyledCardWithTitle from './CardWithTitle.styles';

export interface CardWithTitleProps {
  title: string;
}

const CardWithTitle: FunctionComponent<CardWithTitleProps> = ({ title, children }) => (
  <StyledCardWithTitle>
    <Typography variant="sh3" color="grey" colorShade="dark1">
      {title}
    </Typography>
    <Spacer y={3} />
    {children}
  </StyledCardWithTitle>
);

export default CardWithTitle;
