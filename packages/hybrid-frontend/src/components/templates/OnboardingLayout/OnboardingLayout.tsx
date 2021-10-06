import React from 'react';
import {
  Grid,
  Link,
  Icon,
  Typography,
  Spacer,
  Button,
  ButtonProps,
  StepProgress,
  useBreakpoint,
} from '@tswdts/react-components';
import { navigate } from '@reach/router';
import {
  LeftWrapper,
  RightWrapper,
  BodyWrapper,
  BodyAndHeaderWrapper,
  ActionWrapper,
  LogoImage,
  TertiaryButtonWrapper,
  StepProgressWrapper,
  ContentRightImagePlaceholder,
} from './OnboardingLayout.styles';
import FiftyFiftyPageTemplate, { FiftyFiftyPageTemplateProps } from '../FiftyFiftyPageTemplate';
import { NavPaths } from '../../../config';

const navigateHome = () => navigate(NavPaths.MY_ACCOUNT_BASE_URL);

export interface OnboardingLayoutProps extends FiftyFiftyPageTemplateProps {
  title: string;
  primaryActionProps?: ButtonProps;
  tertiaryActionProps?: ButtonProps;
  secondaryActionProps?: ButtonProps;
  centaliseBody?: boolean;
  stepNames: Array<string>;
  currentStep: number;
}

const OnboardingLayout = ({
  title,
  primaryActionProps,
  tertiaryActionProps,
  secondaryActionProps,
  centaliseBody,
  contentLeft,
  contentRight,
  stepNames,
  currentStep,
}: OnboardingLayoutProps) => {
  const { isMobile } = useBreakpoint();

  const renderStepProgress = (
    <StepProgress stepNames={stepNames} currentStep={currentStep} progress={0} />
  );

  const renderContentLeft = (
    <LeftWrapper container isMobile={isMobile}>
      <BodyAndHeaderWrapper container item xs={12}>
        <Grid item>
          <Link onClick={navigateHome}>
            <LogoImage isMobile={isMobile} />
          </Link>
        </Grid>
        <BodyWrapper item isVerticallyCentered={!!centaliseBody}>
          {isMobile ? (
            <>
              <Spacer y={3} />
              {renderStepProgress}
              <Spacer y={4} />
            </>
          ) : (
            <Spacer y={5} />
          )}
          <Typography variant="h3" color="primary" colorShade="main">
            {title}
          </Typography>
          <Spacer y={4} />

          {contentLeft}
          <Spacer y={7} />
        </BodyWrapper>
      </BodyAndHeaderWrapper>

      <ActionWrapper container item xs={12}>
        <Grid item xs={4}>
          {secondaryActionProps && (
            <Button
              color="primary"
              variant="outlined"
              data-testid="back-button"
              startIcon={<Icon name="arrowHeadLeft" />}
              {...secondaryActionProps}
            />
          )}
        </Grid>
        <TertiaryButtonWrapper item xs={isMobile ? 3 : 2}>
          {tertiaryActionProps && (
            <Button
              color="primary"
              variant={undefined}
              data-testid="skip-button"
              {...tertiaryActionProps}
            />
          )}
        </TertiaryButtonWrapper>
        <Grid item xs={isMobile ? 5 : 6}>
          {primaryActionProps && (
            <Button
              color="primary"
              fullWidth
              variant="contained"
              data-testid="continue-button"
              {...primaryActionProps}
            />
          )}
        </Grid>
      </ActionWrapper>
    </LeftWrapper>
  );

  const renderContentRight = (
    <RightWrapper container>
      <StepProgressWrapper item xs={12}>
        {renderStepProgress}
      </StepProgressWrapper>
      <Grid item>{contentRight || <ContentRightImagePlaceholder src="stats-graphic.png" />}</Grid>
    </RightWrapper>
  );

  return (
    <FiftyFiftyPageTemplate contentLeft={renderContentLeft} contentRight={renderContentRight} />
  );
};

export default OnboardingLayout;
