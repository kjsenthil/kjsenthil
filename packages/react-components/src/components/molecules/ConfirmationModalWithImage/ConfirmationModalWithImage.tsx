import React from 'react';
import { DialogProps, Spacer, Icon } from '../../atoms';
import {
  StyledDialogContainer,
  ModalImage,
  RowBoxSingle,
  ConfirmationGridContainer,
  CloseButton,
  StyledIconButton,
  StyledTypography,
  StyledTypographyDescription,
  RowBoxDescription,
} from './ConfirmationModalWithImage.styles';
import { useBreakpoint } from '../../../hooks';

export interface ConfirmationModalWithImageProps extends DialogProps {
  modalTitle: string;
  description: string;
  modalBackGroundImageSrc: string;
  modalBackGroundColor: string;
  modalImageSrc: string;
  modalImageAlt: string;
  open: boolean;
}

const ConfirmationModalWithImage = ({
  modalTitle,
  description,
  modalImageSrc,
  modalImageAlt,
  modalBackGroundImageSrc,
  modalBackGroundColor,
  open,
  onClose,

  ...props
}: ConfirmationModalWithImageProps) => {
  const { isMobile } = useBreakpoint();
  return (
    <StyledDialogContainer
      {...props}
      open={open}
      onClose={onClose}
      modalBackGroundImgSrc={modalBackGroundImageSrc}
      modalBackGroundColor={modalBackGroundColor}
      isMobile={isMobile}
    >
      <ConfirmationGridContainer>
        <RowBoxSingle>
          <StyledTypography
            variant={isMobile ? 'h3' : 'h2'}
            color="primary"
            colorShade="dark2"
            align="center"
          >
            {modalTitle}
          </StyledTypography>
        </RowBoxSingle>
        <StyledIconButton
          data-testid="cross-close-button"
          aria-label="close"
          onClick={() => typeof onClose !== 'undefined' && onClose({}, 'escapeKeyDown')}
        >
          <Icon name="cross" fontSize={isMobile ? 'medium' : 'large'} />
        </StyledIconButton>
      </ConfirmationGridContainer>
      <RowBoxSingle>
        <ModalImage src={modalImageSrc} alt={modalImageAlt} isMobile={isMobile} />
      </RowBoxSingle>
      <Spacer y={isMobile ? 2 : 2.3625} />
      <RowBoxDescription>
        <StyledTypographyDescription variant="b2" color="primary" colorShade="dark2">
          {description}
        </StyledTypographyDescription>
      </RowBoxDescription>
      <Spacer y={isMobile ? 2 : 4.5} />
      <RowBoxSingle>
        <CloseButton
          color="primary"
          size="small"
          variant="contained"
          isMobile={isMobile}
          onClick={() => typeof onClose !== 'undefined' && onClose({}, 'escapeKeyDown')}
        >
          Close
        </CloseButton>
      </RowBoxSingle>
    </StyledDialogContainer>
  );
};

export default ConfirmationModalWithImage;
