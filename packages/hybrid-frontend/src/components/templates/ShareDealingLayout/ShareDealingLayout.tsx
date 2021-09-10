import React from 'react';
import {
  Grid,
  Spacer,
  Typography,
  IconButton,
  Icon,
  DialogProps,
  Button,
  useBreakpoint,
} from '@tswdts/react-components';
import {
  ShareDealingModal,
  ShareDealingContent,
  ShareDealingTitleContainer,
  ShareDealingCloseButtonWrapper,
  ShareDealingEndStateTitleContainer,
} from './ShareDealingLayout.styles';

export interface ShareDealingLayoutProps extends DialogProps {
  children: React.ReactNode;
  titleText: string;
  titleSubText: string;
  onPrimaryAtionClick: () => void;
  onClose: () => void;
  onSecondaryActionClick?: () => void;
  secondaryIsCancel?: boolean;
  primaryActionText: string;
  secondaryActionText?: string;
  isEndState?: boolean;
}

const ShareDealingLayout = ({
  children,
  titleText,
  titleSubText,
  onClose,
  onPrimaryAtionClick,
  onSecondaryActionClick,
  primaryActionText,
  secondaryActionText,
  secondaryIsCancel,
  isEndState = false,
  ...props
}: ShareDealingLayoutProps) => {
  const { isMobile } = useBreakpoint();

  return (
    <ShareDealingModal
      maxWidth={isMobile ? false : 'lg'}
      scroll="body"
      isMobile={isMobile}
      fullWidth={!isEndState && !isMobile}
      isEndState={isEndState}
      aria-labelledby="share-dealing-modal"
      {...props}
    >
      <ShareDealingCloseButtonWrapper isMobile={isMobile}>
        <IconButton
          data-testid="close-share-dealing"
          aria-label="close"
          onClick={() => typeof onClose !== 'undefined' && onClose()}
          component="button"
        >
          <Icon name="cross" />
        </IconButton>
      </ShareDealingCloseButtonWrapper>
      {isEndState ? (
        <ShareDealingEndStateTitleContainer>
          <Typography variant={isMobile ? 'h3' : 'h2'}>{titleText}</Typography>
          <Spacer y={2} />
          <Typography variant="b2" color="primary" colorShade="dark2">
            {titleSubText}
          </Typography>
        </ShareDealingEndStateTitleContainer>
      ) : (
        <ShareDealingTitleContainer isMobile={isMobile}>
          <Typography variant={isMobile ? 'sh3' : 'sh4'} color="grey">
            {titleSubText.toUpperCase()}
          </Typography>
          <Typography variant={isMobile ? 'h3' : 'h2'}>{titleText}</Typography>
        </ShareDealingTitleContainer>
      )}

      <ShareDealingContent isMobile={isMobile} isEndState={isEndState}>
        <Grid container>
          <Grid item xs={12}>
            {children}
            <Spacer y={isMobile ? 2 : 4} />
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction={isMobile ? 'column-reverse' : 'row'}
              spacing={isMobile || isEndState ? 2 : 0}
              justifyContent="center"
            >
              {secondaryActionText && onSecondaryActionClick && (
                <Grid item sm={12} md={isEndState ? 5 : 8}>
                  <Button
                    onClick={onSecondaryActionClick}
                    color="primary"
                    variant="outlined"
                    fullWidth={isMobile || isEndState}
                    startIcon={secondaryIsCancel && <Icon name="cross" />}
                    data-testid="share-dealing-secondary-action"
                  >
                    {secondaryActionText}
                  </Button>
                </Grid>
              )}
              <Grid item sm={12} md={isEndState ? 7 : 4}>
                <Button
                  onClick={onPrimaryAtionClick}
                  color="primary"
                  fullWidth
                  data-testid="share-dealing-primary-action"
                >
                  {primaryActionText}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ShareDealingContent>
    </ShareDealingModal>
  );
};

export default ShareDealingLayout;
