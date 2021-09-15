import React from 'react';
import { DialogProps } from '@material-ui/core';
import { Icon, Typography, Spacer } from '../../atoms';
import { useBreakpoint } from '../../../hooks';
import {
  StyledDialogContainer,
  HeaderTitleWrapper,
  StyledDialogConfirmationContent,
  StyledDialogContentProcessHeader,
  StyledDialogTitle,
  StyledDialogHeaderTitle,
  StyledIconButton,
} from './ModalWithHeader.styles';

export interface ModalProps extends DialogProps {
  modalTitle: string;
  subTitle?: string;
  hideCloseButton?: boolean;
  variant?: 'Process' | 'Confirmation' | 'Default';
}

const ModalWithHeader = ({
  variant = 'Default',
  modalTitle,
  subTitle,
  onClose,
  hideCloseButton = false,
  children,
  ...props
}: ModalProps) => {
  const { isMobile } = useBreakpoint();
  const renderIcon = () => (
    <StyledIconButton
      placeInCorner={variant === 'Confirmation'}
      isMobile={isMobile}
      aria-label="close"
      data-testid="close-share-dealing"
      onClick={() => typeof onClose !== 'undefined' && onClose({}, 'escapeKeyDown')}
    >
      <Icon name="cross" fontSize={isMobile ? 'medium' : 'large'} />
    </StyledIconButton>
  );

  const renderDialogHeaderTitle = (headerProps: {
    showHeaderBoxShadow: boolean;
    setSlightlyRight: boolean;
  }) => (
    <StyledDialogHeaderTitle isMobile={isMobile} {...headerProps}>
      <HeaderTitleWrapper>
        <Typography
          variant={isMobile ? 'b5' : 'b4'}
          display="inline"
          color="grey"
          colorShade="dark1"
        >
          {subTitle?.toUpperCase()}
        </Typography>
        <Typography
          variant={isMobile ? 'h3' : 'h2'}
          display="inline"
          color="primary"
          colorShade="dark2"
        >
          {modalTitle}
        </Typography>
      </HeaderTitleWrapper>
    </StyledDialogHeaderTitle>
  );

  const renderChildren = () => {
    switch (variant) {
      case 'Process':
        return (
          <>
            {renderDialogHeaderTitle({
              showHeaderBoxShadow: false,
              setSlightlyRight: false,
            })}

            <StyledDialogContentProcessHeader>{children}</StyledDialogContentProcessHeader>
          </>
        );

      case 'Confirmation':
        return (
          <>
            <StyledDialogTitle disableTypography>
              <Typography variant={isMobile ? 'h3' : 'h2'}>{modalTitle}</Typography>
              {subTitle && (
                <>
                  <Spacer y={2} />
                  <Typography variant="b2" color="primary" colorShade="dark2">
                    {subTitle}
                  </Typography>
                </>
              )}
            </StyledDialogTitle>

            <StyledDialogConfirmationContent isMobile={!!isMobile}>
              {children}
            </StyledDialogConfirmationContent>
          </>
        );
      case 'Default':
        return (
          <>
            {renderDialogHeaderTitle({ showHeaderBoxShadow: true, setSlightlyRight: true })}
            {children}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <StyledDialogContainer
      onClose={onClose}
      isMobile={isMobile}
      showLogoBackground={variant === 'Confirmation'}
      {...props}
    >
      {hideCloseButton || renderIcon()}
      {renderChildren()}
    </StyledDialogContainer>
  );
};
export default ModalWithHeader;
