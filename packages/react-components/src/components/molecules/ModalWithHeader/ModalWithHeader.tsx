import React from 'react';
import { DialogProps } from '@material-ui/core';
import { Icon, Typography, Grid, useTheme } from '../../atoms';
import { useBreakpoint } from '../../../hooks';
import {
  StyledDialogContainer,
  HeaderTitleWrapper,
  StyledDialogContentWithoutHeader,
  StyledDialogTitle,
  StyledDialogHeaderTitle,
  HeaderBar,
  HeaderBarList,
  StyledIconButton,
  HeaderContainer,
} from './ModalWithHeader.styles';
import { Color } from '../../atoms/Typography';

export interface ModalProps extends DialogProps {
  modalTitle: string;
  subTitle?: string;
  modalBackgroundImgSrc?: string;
  headerBackgroundColor?: string;
  modalWidth?: string;
  variant?: 'DefaultTitle' | 'withSubTitle' | 'withoutClose';
}

const ModalWithHeader = ({
  variant,
  modalTitle,
  subTitle,
  modalBackgroundImgSrc,
  headerBackgroundColor,
  modalWidth,
  onClose,
  children,
  ...props
}: ModalProps) => {
  const theme = useTheme();
  const { isMobile } = useBreakpoint();
  switch (variant) {
    case 'withSubTitle':
      return (
        <StyledDialogContainer
          onClose={onClose}
          {...props}
          modalWidth={modalWidth}
          headerBackgroundColor={headerBackgroundColor}
          withHeader
        >
          <StyledDialogHeaderTitle isMobile={isMobile}>
            <HeaderContainer>
              <HeaderTitleWrapper>
                <Typography
                  variant={isMobile ? 'b5' : 'b4'}
                  display="inline"
                  color="grey"
                  colorShade="dark1"
                >
                  {subTitle}
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

              <StyledIconButton
                aria-label="close"
                onClick={() => typeof onClose !== 'undefined' && onClose({}, 'escapeKeyDown')}
              >
                <Icon name="cross" fontSize={isMobile ? 'medium' : 'large'} />
              </StyledIconButton>
            </HeaderContainer>
          </StyledDialogHeaderTitle>
          <HeaderBar>
            <HeaderBarList
              color={`linear-gradient(to left, ${theme.palette.primary.light1}, ${theme.palette.primary.main} 60%)`}
            />
            <HeaderBarList color={theme.palette.grey[200]} />
          </HeaderBar>

          {children}
        </StyledDialogContainer>
      );
    case 'withoutClose':
      return (
        <StyledDialogContainer
          onClose={onClose}
          {...props}
          modalBackgroundImgSrc={modalBackgroundImgSrc}
          withHeader={false}
          isMobile={isMobile}
        >
          <StyledDialogTitle disableTypography>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              className="modalTitle"
            >
              <Grid item xs={12}>
                <Typography
                  variant="h2"
                  display="inline"
                  color={theme.palette.primary.dark2 as Color}
                >
                  {modalTitle}
                </Typography>
              </Grid>
            </Grid>
          </StyledDialogTitle>

          <StyledDialogContentWithoutHeader>{children}</StyledDialogContentWithoutHeader>
        </StyledDialogContainer>
      );
    case 'DefaultTitle':
      return (
        <StyledDialogContainer
          onClose={onClose}
          {...props}
          modalBackgroundImgSrc={modalBackgroundImgSrc}
          withHeader={false}
        >
          <StyledDialogTitle disableTypography>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              className="modalTitle"
            >
              <Grid item xs={11}>
                <Typography variant="h2" display="inline" color="primary">
                  {modalTitle}
                </Typography>
              </Grid>

              <Grid item xs={1} container justifyContent="flex-end">
                <StyledIconButton aria-label="close">
                  <Icon name="cross" />
                </StyledIconButton>
              </Grid>
            </Grid>
          </StyledDialogTitle>

          <StyledDialogContentWithoutHeader>{children}</StyledDialogContentWithoutHeader>
        </StyledDialogContainer>
      );
    default:
      return null;
  }
};
export default ModalWithHeader;
