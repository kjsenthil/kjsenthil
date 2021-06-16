import { navigate } from 'gatsby';
import React from 'react';
import { LinearProgress, Button, Divider, Grid, Icon, IconButton, Spacer } from '../../atoms';
import LayoutContainer from '../LayoutContainer';
import { GoalTitle, GoalTitleIcon, StyledAppBar, StyledToolBar } from './GoalCreationLayout.styles';

export interface GoalCreationLayoutProps {
  children: React.ReactNode;
  title?: string;
  iconSrc?: string;
  iconAlt?: string;
  progressButtonTitle?: string;
  onDeleteHandler?: () => void;
  disableProgress?: boolean;
  isLoading?: boolean;
  progressEventHandler?: () => void;
  onCancelHandler?: () => void;
}

const navigateBack = () => navigate(-1);

const GoalCreationLayout = ({
  children,
  title = 'Your life after work',
  iconSrc = '/goal-graphic.png',
  iconAlt = 'goal image',
  progressButtonTitle = 'Next',
  onDeleteHandler,
  isLoading = false,
  disableProgress = false,
  progressEventHandler,
  onCancelHandler = navigateBack,
}: GoalCreationLayoutProps) => (
  <LayoutContainer>
    <StyledAppBar position="relative" data-testid="goal-header-menu" elevation={0}>
      <StyledToolBar>
        <Grid container alignContent="center">
          <Grid item xs={12} md={6}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <GoalTitleIcon src={iconSrc} alt={iconAlt} />
              </Grid>
              <Grid item>
                <GoalTitle variant="b1">{title}</GoalTitle>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container justify="flex-end">
              <Grid item>
                <IconButton aria-label="close" onClick={onCancelHandler}>
                  <Icon name="cross" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledToolBar>
    </StyledAppBar>
    {isLoading && <LinearProgress color="primary" />}
    <Spacer y={4} />
    {children}
    <Spacer y={1} />
    <Divider y={6} />
    <Grid container alignContent="center" spacing={2}>
      <Grid item xs={12} sm={6}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Button
              onClick={onCancelHandler}
              variant="outlined"
              disabled={isLoading}
              startIcon={<Icon name="cross" fontSize="large" />}
            >
              Cancel
            </Button>
          </Grid>
          {onDeleteHandler && (
            <Grid item>
              <Button
                onClick={onDeleteHandler}
                variant="outlined"
                disabled={isLoading}
                color="error"
                startIcon={<Icon name="delete" fontSize="large" />}
              >
                Delete
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6}>
        {progressEventHandler && (
          <Grid container justify="flex-end">
            <Grid item xs={12} sm={4}>
              <Button
                onClick={progressEventHandler}
                fullWidth
                disabled={disableProgress || isLoading}
              >
                {progressButtonTitle}
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  </LayoutContainer>
);

export default GoalCreationLayout;
