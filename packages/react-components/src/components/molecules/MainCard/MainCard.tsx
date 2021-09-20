import React from 'react';
import { Box, Grid, Typography, useTheme, useMediaQuery } from '../../atoms';
import { ActionElementContainer, CardContainer } from './MainCard.styles';

type FunctionAsChild = (isMobile: boolean) => React.ReactNode;

export interface MainCardProps {
  title?: string | React.ReactNode;
  children: React.ReactNode | FunctionAsChild;
  isLoading?: boolean;
  respondTo?: 'xs' | 'sm';
  renderActionEl?: (fullWidth: boolean) => React.ReactElement;
  style?: React.CSSProperties;
}

const MainCard = ({
  title,
  children,
  isLoading = false,
  respondTo,
  renderActionEl,
  style,
  ...props
}: MainCardProps) => {
  const theme = useTheme();
  const isMobile = respondTo ? useMediaQuery(theme.breakpoints.down(respondTo as any)) : false;

  return (
    <CardContainer isLoading={isLoading} isMobile={isMobile} style={style} {...props}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {!isLoading && (
            <Box display="flex" justifyContent="space-between" alignItems="center">
              {title &&
                (title === 'string' ? <Typography variant="h4">{title}</Typography> : title)}
              {!isMobile && renderActionEl && (
                <ActionElementContainer>{renderActionEl(false)}</ActionElementContainer>
              )}
            </Box>
          )}
        </Grid>
        <Grid item xs={12}>
          {!isLoading && (typeof children === 'function' ? children(isMobile) : children)}
        </Grid>
        {!isLoading && isMobile && renderActionEl && renderActionEl(true)}
      </Grid>
    </CardContainer>
  );
};

export default MainCard;
