import * as React from 'react';
import { navigate } from 'gatsby';
import { Button, Divider, Grid, Icon, IconButton, LinearProgress, Spacer } from '../../atoms';
import { DisabledComponent, TabsNavigation, TabsNavigationProps } from '../../molecules';
import LayoutContainer from '../LayoutContainer';
import { GoalTitle, GoalTitleIcon, StyledAppBar, StyledToolBar } from './GoalCreationLayout.styles';

export interface GoalCreationLayoutProps {
  title?: string;
  iconSrc?: string;
  iconAlt?: string;
  progressButtonTitle?: string;
  isLoading?: boolean;

  // Navigation
  disableProgress?: boolean;
  progressEventHandler?: () => void;
  onDeleteHandler?: () => void;
  onCancelHandler?: () => void;

  // Tabs
  tabsNavigationProps: TabsNavigationProps;

  children: React.ReactNode;
}

const navigateBack = () => navigate(-1);

const GoalCreationLayout = ({
  title = 'Your life after work',
  iconSrc = '/goal-graphic.png',
  iconAlt = 'goal image',
  progressButtonTitle = 'Next',
  onDeleteHandler,
  isLoading = false,
  disableProgress = false,
  progressEventHandler,
  onCancelHandler = navigateBack,
  tabsNavigationProps,
  children,
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
    <Spacer y={7.5} />

    <TabsNavigation {...tabsNavigationProps} />

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
          <Grid container alignItems="center" spacing={2} justify="flex-end">
            <Grid item>
              <DisabledComponent arrow placement="top" title="Coming soon">
                <Button fullWidth variant="outlined" disabled={disableProgress || isLoading}>
                  Save to my to-do list
                </Button>
              </DisabledComponent>
            </Grid>
            <Grid item>
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
