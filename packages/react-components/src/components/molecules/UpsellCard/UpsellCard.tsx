import React from 'react';
import { Box, Grid, useTheme, useMediaQuery } from '../../atoms';
import {
  ActionElementContainer,
  UpsellCardContainer,
  OverlayTriangle,
  TitleContainer,
} from './UpsellCard.styles';

type FunctionAsChild = (isMobile: boolean) => React.ReactNode;

export interface UpsellCardProps {
  title?: string;
  children: React.ReactNode | FunctionAsChild;
  isLoading?: boolean;
  background?: 'triangle overlay';
  respondTo?: 'xs' | 'sm';
  renderActionEl?: (fullWidth: boolean) => React.ReactElement;
  style?: React.CSSProperties;
}

const UpsellCard = ({
  title,
  children,
  background,
  isLoading = false,
  respondTo,
  renderActionEl,
  style,
}: UpsellCardProps) => {
  const theme = useTheme();
  const isMobile = respondTo ? useMediaQuery(theme.breakpoints.down(respondTo as any)) : false;

  return (
    <UpsellCardContainer isLoading={isLoading} isMobile={isMobile} theme={theme} style={style}>
      {background === 'triangle overlay' && (
        <>
          <OverlayTriangle
            top={isMobile ? '-165px' : '0'}
            width={isMobile ? '98px' : '207px'}
            angle="58%"
          />
          <OverlayTriangle
            top={isMobile ? '55px' : '63px'}
            width={isMobile ? '165px' : '242px'}
            angle={isMobile ? '69%' : '85%'}
          />
        </>
      )}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {!isLoading && (
            <Box display="flex" justifyContent="space-between" alignItems="center">
              {title && <TitleContainer isMobile={isMobile}>{title}</TitleContainer>}
              {!isMobile && renderActionEl && (
                <ActionElementContainer>{renderActionEl(false)}</ActionElementContainer>
              )}
            </Box>
          )}
        </Grid>
        <Grid item xs={12} style={{ zIndex: 10 }}>
          {!isLoading && (typeof children === 'function' ? children(isMobile) : children)}
        </Grid>
        {!isLoading && isMobile && renderActionEl && renderActionEl(true)}
      </Grid>
    </UpsellCardContainer>
  );
};

export default UpsellCard;
