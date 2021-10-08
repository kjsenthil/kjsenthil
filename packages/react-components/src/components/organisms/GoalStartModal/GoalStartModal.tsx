import React from 'react';
import { Typography, Grid, Spacer, Box, useMediaQuery, useTheme, DialogProps } from '../../atoms';
import {
  StyledDialogContainer,
  StyledDialogContent,
  StyledIcon,
  StyledButton,
  StyledDialogTitle,
} from './GoalStartModal.styles';

export interface GoalStartModalProps extends DialogProps {
  onClose: () => void;
}

const GoalStartModal = ({ onClose, ...props }: GoalStartModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Grid container alignItems="center" justifyContent="center">
      <StyledDialogContainer maxWidth="md" isMobile={isMobile} {...props}>
        <StyledDialogTitle>
          <Typography variant="h2" color="primary" colorShade="dark2">
            Before you start
          </Typography>
        </StyledDialogTitle>

        <StyledDialogContent>
          <Grid item>
            <Box display="flex" alignItems="flex-start">
              <StyledIcon name="rocket" color="primary" />
              <Typography variant="h5" color="primary" colorShade="dark2">
                With goals you can:
              </Typography>
            </Box>
            <Spacer y={2} />
            <Grid item>
              <Typography variant="b3" color="primary" colorShade="dark2">
                - Enter how much money you&apos;ll need and by when
              </Typography>
              <Typography variant="b3" color="primary" colorShade="dark2">
                - See how much your money could grow, with a forecast based on your selected
                accounts, contributions and current investments
              </Typography>
              <Typography variant="b3" color="primary" colorShade="dark2">
                - Simulate the impact of putting more money in or changing how you invest
              </Typography>
              <Typography variant="b3" color="primary" colorShade="dark2">
                - Make it happen if you like what you see
              </Typography>
            </Grid>
            <Spacer y={2} />
          </Grid>

          <Grid item>
            <Box display="flex" alignItems="flex-start">
              <StyledIcon name="list" color="primary" />
              <Typography variant="h5" color="primary" colorShade="dark2">
                Before you get started, a few reminders
              </Typography>
            </Box>
            <Spacer y={2} />
            <Grid item>
              <Typography variant="b3" color="primary" colorShade="dark2">
                - The goal feature gives you an informed feel for what might happen, it does not
                constitute regulated advice
              </Typography>
              <Typography variant="b3" color="primary" colorShade="dark2">
                - It is based on economic assumptions and regulation in force today, which may
                change over time
              </Typography>
              <Typography variant="b3" color="primary" colorShade="dark2" gutterBottom>
                - If you want to understand more about the impact of tax, inflation and withdrawal
                restrictions, your coach will be happy to give you more information
              </Typography>
            </Grid>
            <Spacer y={2} />
          </Grid>

          <Grid item>
            <Box display="flex" alignItems="flex-start">
              <StyledIcon name="like" color="primary" />
              <Typography variant="h5" color="primary" colorShade="dark2">
                If you&apos;re happy with this, let&apos;s get started...
              </Typography>
            </Box>
            <Spacer y={3} />
          </Grid>

          <Grid item container justifyContent="flex-end" alignItems="center">
            <StyledButton variant="contained" color="primary" isMobile={isMobile} onClick={onClose}>
              Continue
            </StyledButton>
          </Grid>
        </StyledDialogContent>
      </StyledDialogContainer>
    </Grid>
  );
};

export default GoalStartModal;
