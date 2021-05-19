import React from 'react';
import { Grid, Typography } from '../../atoms';
import CustomCard from './MainCard.styles';

export interface MainCardProps {
  title?: string;
  children: React.ReactNode;
  renderActionEl?: () => React.ReactElement;
}

const MainCard = ({ title, children, renderActionEl }: MainCardProps) => (
  <CustomCard>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container justify="space-between">
          <Grid item xs={12} sm={6}>
            <Grid container justify="flex-start">
              <Grid item>{title && <Typography variant="h4">{title}</Typography>}</Grid>
            </Grid>
          </Grid>
          {renderActionEl && (
            <Grid item xs={12} sm={6}>
              <Grid container justify="flex-end">
                <Grid item xs={12} sm={4} md={3}>
                  <Grid container>{renderActionEl()}</Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  </CustomCard>
);

export default MainCard;
