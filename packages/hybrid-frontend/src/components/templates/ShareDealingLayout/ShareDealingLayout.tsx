import React from 'react';
import {
  Grid,
  Spacer,
  ModalProps,
  ButtonProps,
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
  primaryActionProps?: ButtonProps;
  secondaryActionProps?: ButtonProps;
  renderSecondaryAction?: React.ReactElement;
  onClose: () => void;
  shouldDisablePrimaryAction?: boolean;
  secondaryIsCancel?: boolean;
  isEndState?: boolean;
}

const ShareDealingLayout = ({
  children,
  titleText,
  titleSubText,
  onClose,
  primaryActionProps,
  secondaryActionProps,
  secondaryIsCancel,
  isEndState = false,
  ...props
}: ShareDealingLayoutProps) => {
  const { isMobile } = useBreakpoint();

  const renderContent = (
    <Grid container>
      <Grid item xs={12}>
        {children}
        <Spacer y={isMobile ? 2 : 3} />
      </Grid>
      {!!primaryActionProps && (
        <Grid item xs={12}>
          <Grid
            container
            direction={isMobile ? 'column-reverse' : 'row'}
            spacing={isMobile || isEndState ? 2 : 0}
            justifyContent="center"
          >
            <Grid item sm={12} md={isEndState ? 5 : 8}>
              {!!secondaryActionProps && (
                <Button
                  color="primary"
                  variant="outlined"
                  fullWidth={isMobile || isEndState}
                  data-testid="share-dealing-secondary-action"
                  {...secondaryActionProps}
                />
              )}
            </Grid>
            <Grid item sm={12} md={isEndState ? 7 : 4}>
              <Button
                color="primary"
                fullWidth
                data-testid="share-dealing-primary-action"
                {...primaryActionProps}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
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
