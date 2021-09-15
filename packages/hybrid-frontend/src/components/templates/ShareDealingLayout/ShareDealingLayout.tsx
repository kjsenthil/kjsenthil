import React from 'react';
import {
  Grid,
  Spacer,
  Icon,
  ModalProps,
  DialogProps,
  Button,
  useBreakpoint,
  ModalWithHeaderV2,
} from '@tswdts/react-components';
import { ShareDealingContent } from './ShareDealingLayout.styles';

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

  const renderContent = (
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
  );

  const modalProps: Partial<ModalProps> = {
    scroll: 'body',
    maxWidth: isMobile ? false : 'lg',
    'aria-labelledby': 'share-dealing-modal',
    fullWidth: !isEndState && !isMobile,
    onClose,
  };

  return isEndState ? (
    <ModalWithHeaderV2
      variant="Confirmation"
      modalTitle={titleText}
      subTitle={titleSubText}
      {...modalProps}
      {...props}
    >
      {renderContent}
    </ModalWithHeaderV2>
  ) : (
    <ModalWithHeaderV2
      modalTitle={titleText}
      subTitle={titleSubText}
      scroll="body"
      {...modalProps}
      {...props}
    >
      <ShareDealingContent isMobile={isMobile} isEndState={isEndState}>
        {renderContent}
      </ShareDealingContent>
    </ModalWithHeaderV2>
  );
};

export default ShareDealingLayout;
