import React from 'react';
import { Box, Grid, Typography, useTheme, useMediaQuery } from '../../atoms';
import { ActionElementContainer, CardContainer } from './MainCard.styles';

export interface MainCardProps {
  title?: string;
  children: React.ReactNode;
  respondTo?: 'xs' | 'sm';
  renderActionEl?: (fullWidth: boolean) => React.ReactElement;
}

const MainCard = ({ title, children, respondTo, renderActionEl }: MainCardProps) => {
  const theme = useTheme();
  const isMobile = respondTo ? useMediaQuery(theme.breakpoints.down(respondTo as any)) : false;

  return (
    <CardContainer isMobile={isMobile}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {title && <Typography variant="h4">{title}</Typography>}
            {!isMobile && renderActionEl && (
              <ActionElementContainer>{renderActionEl(false)}</ActionElementContainer>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
        {isMobile && renderActionEl && renderActionEl(true)}
      </Grid>
    </CardContainer>
  );
};

export default MainCard;
