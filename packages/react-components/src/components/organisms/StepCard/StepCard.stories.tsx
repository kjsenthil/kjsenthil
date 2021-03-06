import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import StepCard, { StepCardProps } from './StepCard';
import { Radio, FormControlLabel } from '../../atoms';
import { RadioGroup, TypographyWithTooltip } from '../../molecules';

export default {
  title: 'Digital Hybrid/Organisms/Step Card Experimental',
  component: StepCard,
  argTypes: {},
} as Meta;

const Template: Story<StepCardProps> = (args) => (
  <StepCard {...args}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <TypographyWithTooltip tooltip="Some explanation">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </TypographyWithTooltip>
      </div>
      <div>
        <RadioGroup row>
          <FormControlLabel value="true" control={<Radio />} label="Yes" />
          <FormControlLabel value="false" control={<Radio />} label="No" />
        </RadioGroup>
      </div>
    </div>
  </StepCard>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Some title here',
  step: 1,
  childrenFullWidth: false,
};
