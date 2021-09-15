import React from 'react';
import { Icon, IconButton, Typography, Grid, Button } from '../../atoms';
import { useBreakpoint } from '../../../hooks';
import {
  StyledDialogContainer,
  StyledDialogContent,
  StyledDialogTitle,
  StyledIcon,
  ParentContainer,
  ButtonContainer,
  BottomRow,
  BottomRowWrapper,
} from './ConfirmationModal.styles';
import { ConfirmationModalProps } from './types';

const ConfirmationModal = ({
  title,
  icon,
  message,
  buttons,
  onClose,
  ...props
}: ConfirmationModalProps) => {
  const { isMobile } = useBreakpoint();

  return (
    <StyledDialogContainer {...props} onClose={onClose} isMobile={isMobile}>
      <ParentContainer isMobile={isMobile}>
        <StyledDialogTitle disableTypography>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={10} container alignItems="center">
              <StyledIcon {...icon} />
              <Typography variant="h5" display="inline" color="primary" colorShade="dark2">
                {title}
              </Typography>
            </Grid>

            <Grid item xs={2} container justifyContent="flex-end">
              <IconButton
                aria-label="close"
                onClick={() => typeof onClose !== 'undefined' && onClose({}, 'escapeKeyDown')}
                component="button"
                className="closeIcon"
              >
                <Icon name="cross" />
              </IconButton>
            </Grid>
          </Grid>
        </StyledDialogTitle>

        <StyledDialogContent>{message}</StyledDialogContent>
        <BottomRowWrapper isMobile={isMobile}>
          <BottomRow container>
            {buttons.reverse().map((button) => {
              const { handler, ...buttonProps } = button;
              return (
                <ButtonContainer isMobile={isMobile} key={button.label}>
                  <Button onClick={handler} fullWidth={isMobile} {...buttonProps}>
                    {button.label}
                  </Button>
                </ButtonContainer>
              );
            })}
          </BottomRow>
        </BottomRowWrapper>
      </ParentContainer>
    </StyledDialogContainer>
  );
};
export default ConfirmationModal;
