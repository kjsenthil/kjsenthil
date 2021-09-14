import React from 'react';
import { Icon, Typography, Grid } from '../../atoms';
import { useBreakpoint } from '../../../hooks';
import { StyledBanner, StyledButton, StyledText } from './Banner.styles';

export interface BannerProps {
  icon?: string;
  title: string;
  paragraph: string;
  handleClick?: () => void;
  buttonLabel?: string;
}

const Banner = ({ icon, title, paragraph, handleClick, buttonLabel }: BannerProps) => {
  const { isMobile } = useBreakpoint();

  return (
    <StyledBanner>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Grid container alignItems="flex-start" spacing={1}>
            {icon && <Icon name={icon} color="primary" />}
            <Grid item>
              <Typography variant="sh3" color="primary">
                {title}
              </Typography>
              <StyledText isMobile={isMobile && buttonLabel}>{paragraph}</StyledText>
            </Grid>
          </Grid>
        </Grid>
        {buttonLabel && (
          <StyledButton color="primary" variant="outlined" onClick={handleClick} fullWidth>
            {buttonLabel}
          </StyledButton>
        )}
      </Grid>
    </StyledBanner>
  );
};

export default Banner;
