import React from 'react';
import { Button, Icon, Grid } from '../../atoms';
import { useBreakpoint } from '../../../hooks';
import {
  StyledSplashHeader,
  StyledTextContainer,
  StyledImageContainer,
  StyledHeading,
  StyledSubHeading,
  StyledImage,
} from './SplashHeader.styles';

export interface SplashHeaderProps {
  title: string;
  bodyText: string;
  buttonText: string;
  iconName?: string;
  onButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  imageSrc: string;
  imageAlt: string;
  isLoading?: boolean;
}

const SplashHeader = ({
  title,
  bodyText,
  onButtonClick,
  buttonText,
  iconName,
  imageSrc,
  imageAlt,
  isLoading = false,
}: SplashHeaderProps) => {
  const { isMobile } = useBreakpoint();

  return (
    <StyledSplashHeader isMobile={isMobile} isLoading={isLoading}>
      <Grid
        container
        direction={isMobile ? 'column-reverse' : 'row'}
        justifyContent={isMobile ? undefined : 'space-between'}
      >
        {!isLoading && (
          <>
            <StyledTextContainer isMobile={isMobile} md={6} item>
              <StyledHeading isMobile={isMobile} variant={isMobile ? 'h3' : 'h1'} color="white">
                {title}
              </StyledHeading>
              <StyledSubHeading isMobile={isMobile} variant="sh1" color="white">
                {bodyText}
              </StyledSubHeading>
              <Button
                variant="contained"
                color="white"
                startIcon={iconName ? <Icon name={iconName} /> : undefined}
                onClick={onButtonClick}
                aria-label={buttonText}
              >
                {buttonText}
              </Button>
            </StyledTextContainer>
            <StyledImageContainer isMobile={isMobile} md={5} item>
              <StyledImage isMobile={isMobile} src={imageSrc} alt={imageAlt} />
            </StyledImageContainer>
          </>
        )}
      </Grid>
    </StyledSplashHeader>
  );
};

export default SplashHeader;
