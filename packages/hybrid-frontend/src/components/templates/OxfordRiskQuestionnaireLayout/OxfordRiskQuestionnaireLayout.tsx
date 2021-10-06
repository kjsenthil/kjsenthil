import React from 'react';
import MainCard from '@tswdts/react-components/src/components/molecules/MainCard';
import { Icon, useBreakpoint } from '@tswdts/react-components/src';
import FiftyFiftyPageTemplate from '../FiftyFiftyPageTemplate';
import {
  BestInvestLogo,
  ButtonContainer,
  CardContainer,
  LeftContentContainer,
  OverlayDotPattern,
  OverlayTriangle,
  RightContentContainer,
  ExitLink,
  StyledButton,
  TickContainer,
} from './OxfordRiskQuestionnaireLayout.styles';

export interface OxfordRiskQuestionnaireLayoutProps {
  variant: 'start' | 'inProgress' | 'finalQuestion' | 'complete';
  questionnaire: React.ReactNode;
  cardContent?: React.ReactNode;
  handleNext?: () => void;
  handleBack?: () => void;
  handleSubmit?: () => void;
  handleExit?: () => void;
}

const OxfordRiskQuestionnaireLayout = ({
  variant,
  questionnaire,
  cardContent,
  handleNext,
  handleBack,
  handleSubmit,
  handleExit,
}: OxfordRiskQuestionnaireLayoutProps) => {
  const { isMobile } = useBreakpoint();

  const saveAndExitLink = (
    <ExitLink special isMobile={isMobile} onClick={handleExit}>
      Exit
    </ExitLink>
  );

  const questionnaireCompleteTick = (
    <TickContainer>
      <Icon viewBox="0 0 90 90" name="checkmarkCircle" />
    </TickContainer>
  );

  const infoCard = (
    <CardContainer>
      <MainCard>{cardContent}</MainCard>
    </CardContainer>
  );

  const renderRightChildren = () => {
    switch (variant) {
      case 'start':
        return (
          <>
            <OverlayDotPattern height="259px" width="206px" top="32.2%" right="3.5%" />
            <OverlayTriangle left="50%" bottom="0%" height="224px" width="116px" angle="61%" />
            <OverlayTriangle left="50%" bottom="0%" height="146px" width="180px" angle="80%" />
            {saveAndExitLink}
            {infoCard}
          </>
        );
      case 'inProgress':
      case 'finalQuestion':
        return (
          <>
            <OverlayDotPattern height="33.5%" width="19%" top="0" right="0.5%" />
            <OverlayTriangle left="50%" bottom="-1.8%" height="394px" width="254px" angle="64%" />
            <OverlayTriangle left="50%" bottom="-1.8%" height="265px" width="360px" angle="79%" />
            {saveAndExitLink}
          </>
        );
      case 'complete':
        return (
          <>
            <OverlayDotPattern height="259px" width="206px" top="28.8%" right="3.5%" />
            <OverlayTriangle left="50%" bottom="0%" height="224px" width="116px" angle="61%" />
            <OverlayTriangle left="50%" bottom="0%" height="146px" width="180px" angle="80%" />
            {questionnaireCompleteTick}
          </>
        );
      default:
        return null;
    }
  };

  const renderLeftChildren = () => {
    switch (variant) {
      case 'start':
        return (
          <>
            <ButtonContainer isMobile={isMobile} arrangement="flex-end">
              <StyledButton onClick={handleNext} width={310}>
                Next
              </StyledButton>
            </ButtonContainer>
            {isMobile && saveAndExitLink}
          </>
        );
      case 'inProgress':
        return (
          <>
            <ButtonContainer isMobile={isMobile} arrangement="space-between">
              <StyledButton
                onClick={handleBack}
                variant="outlined"
                startIcon={<Icon name="arrowHeadLeft" />}
                width={isMobile ? 310 : 100}
              >
                Back
              </StyledButton>
              <StyledButton onClick={handleNext} width={310}>
                Next
              </StyledButton>
            </ButtonContainer>
            {isMobile && saveAndExitLink}
          </>
        );
      case 'finalQuestion':
        return (
          <ButtonContainer isMobile={isMobile} arrangement="space-between">
            <StyledButton
              onClick={handleBack}
              variant="outlined"
              startIcon={<Icon name="arrowHeadLeft" />}
              width={isMobile ? 310 : 100}
            >
              Back
            </StyledButton>
            <StyledButton onClick={handleSubmit} width={310}>
              Submit
            </StyledButton>
          </ButtonContainer>
        );
      case 'complete':
        return (
          <ButtonContainer isMobile={isMobile}>
            <StyledButton onClick={handleExit} width={isMobile ? 335 : 556}>
              Back to Coaching
            </StyledButton>
          </ButtonContainer>
        );
      default:
        return null;
    }
  };

  const contentLeft = (
    <LeftContentContainer isMobile={isMobile}>
      <BestInvestLogo />
      {questionnaire}
      {renderLeftChildren()}
    </LeftContentContainer>
  );

  const contentRight = <RightContentContainer>{renderRightChildren()}</RightContentContainer>;

  return <FiftyFiftyPageTemplate contentLeft={contentLeft} contentRight={contentRight} />;
};

export default OxfordRiskQuestionnaireLayout;
