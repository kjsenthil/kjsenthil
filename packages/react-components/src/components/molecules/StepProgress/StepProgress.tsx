import * as React from 'react';
import { ProgressStepWrapper, ProgressStep, StepProgressWrapper } from './StepProgress.styles';
import { Typography, Spacer, Grid } from '../../atoms';

export interface StepProgressProps {
  currentStep: number;
  progress: number;
  stepNames: Array<string>;
}

const StepProgress = ({ currentStep, progress, stepNames }: StepProgressProps) => {
  const steps = stepNames.map((stepName, i) => {
    const thisStep = i + 1;
    let currentProgress = 1;
    if (currentStep === thisStep) {
      currentProgress = progress;
    } else if (currentStep < thisStep) {
      currentProgress = 0;
    }

    return {
      stepName,
      currentProgress: currentProgress * 100,
    };
  });

  const currentStepName = stepNames[currentStep - 1];

  const progressOfTotal = `${currentStep} of ${stepNames.length}`;

  return (
    <>
      <Grid container direction="row" spacing={1} alignItems="center">
        <Grid item>
          <Typography variant="sh2" component="span" colorShade="light1">
            {progressOfTotal}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="sh3" component="span">
            &middot;
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="sh3" component="span">
            {currentStepName}
          </Typography>
        </Grid>
      </Grid>
      <Spacer y={1} />
      <StepProgressWrapper>
        {steps.map(({ stepName, currentProgress }) => (
          <ProgressStepWrapper
            role="progressbar"
            data-testid={`step-${stepName}`}
            key={`step-${stepName}`}
          >
            <ProgressStep currentProgress={currentProgress} />
          </ProgressStepWrapper>
        ))}
      </StepProgressWrapper>
    </>
  );
};

export default StepProgress;
