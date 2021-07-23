import * as React from 'react';
import styled from 'styled-components';
import { FormControlLabel, Radio, Theme } from '../../../atoms';
import { DisabledComponent, RadioGroup, TypographyWithTooltip } from '../../../molecules';
import StepCardExperimental from '../../../organisms/StepCardExperimental';

export interface FundingStepCardOneProps {
  includeStatePension: boolean;
}

const FundingStepCardTwoChildContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(3)}px;
  `}
`;

export default function FundingStepCardTwo({ includeStatePension }: FundingStepCardOneProps) {
  return (
    <StepCardExperimental step={2} title="Include your State Pension?">
      <FundingStepCardTwoChildContainer>
        <TypographyWithTooltip typographyProps={{ variant: 'b3' }} tooltip="">
          {`Since the government will provide your state pension, we’ll deduct
           this from your target retirement pot. We use today's maximum figure of
            £9,371.27 a year assuming you contribute National Insurance for 30 
            years.`}
        </TypographyWithTooltip>

        <DisabledComponent title="Coming soon">
          <RadioGroup row value={`${includeStatePension}`}>
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </DisabledComponent>
      </FundingStepCardTwoChildContainer>
    </StepCardExperimental>
  );
}
