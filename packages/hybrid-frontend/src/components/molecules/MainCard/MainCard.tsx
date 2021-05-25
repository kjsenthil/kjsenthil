import React from 'react';
import { Box, Grid, Typography } from '../../atoms';
import { ActionElementContainer, CustomCard } from './MainCard.styles';

export interface MainCardProps {
  title?: string;
  children: React.ReactNode;
  renderActionEl?: () => React.ReactElement;
}

const MainCard = ({ title, children, renderActionEl }: MainCardProps) => (
  <CustomCard>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between">
          {title && <Typography variant="h4">{title}</Typography>}
          {renderActionEl && <ActionElementContainer>{renderActionEl()}</ActionElementContainer>}
        </Box>
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  </CustomCard>
);

export default MainCard;
