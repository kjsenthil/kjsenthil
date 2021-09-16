import * as React from 'react';
import styled from 'styled-components';
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  StepCard,
  TypographyWithTooltip,
  Theme,
} from '@tswdts/react-components';

export interface FundingStepCardOneProps {
  shouldIncludeStatePension: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FundingStepCardTwoChildContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(3)}px;
  `}
`;

const FundingStepCardTwo = React.forwardRef(
  ({ shouldIncludeStatePension, onChange }: FundingStepCardOneProps, ref) => (
    <StepCard ref={ref} step={2} title="Include your State Pension?">
      <FundingStepCardTwoChildContainer>
        <TypographyWithTooltip typographyProps={{ variant: 'b3' }} tooltip="">
          {`If you select "Yes" then we will use today's maximum figure of £9,339.20 a year assuming you` +
            ` contribute National Insurance for 30 years. How much you'll actually receive depends on your National` +
            ` Insurance record. Use the government's website to find out how much your State Pension could be.`}
        </TypographyWithTooltip>

        <RadioGroup row value={String(shouldIncludeStatePension)} onChange={onChange}>
          <FormControlLabel value="true" control={<Radio />} label="Yes" />
          <FormControlLabel value="false" control={<Radio />} label="No" />
        </RadioGroup>
      </FundingStepCardTwoChildContainer>
    </StepCard>
  )
);

export default FundingStepCardTwo;
