import React, { FunctionComponent } from 'react';
import { Spacer, Typography } from '../../atoms';
import InfoCardContainer from './InfoCard.styles';

export interface InfoCardProps {
  title: string;
  content: string;
}

const InfoCard: FunctionComponent<InfoCardProps> = ({ title, content }) => (
  <InfoCardContainer>
    <Typography variant="h5" color="grey" colorShade="dark1" align="left">
      {title}
    </Typography>

    <Spacer y={2.3} />

    <Typography variant="b2" color="grey" colorShade="dark1" align="left">
      {content}
    </Typography>
  </InfoCardContainer>
);

export default InfoCard;
