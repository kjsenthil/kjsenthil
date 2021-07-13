import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import StepCard, { StepCardProps } from './StepCard';
import { RadioGroup, TypographyWithTooltip } from '../../molecules';
import { Grid, Radio, FormControlLabel } from '../../atoms';

export default {
  title: 'Digital Hybrid/Organisms/Step Card',
  component: StepCard,
  argTypes: {},
} as Meta;

const Template: Story<StepCardProps> = (args) => <StepCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Would you like to include the full State Pension in your estimated income?',
  step: 1,
  digitalCoachBoxProps: {
    title: 'Coach box title',
    description: 'Coach box description',
    tooltip: 'Coach box tooltip',
  },
  children: (
    <Grid container xs={12}>
      <Grid item>
        <TypographyWithTooltip tooltip="Some explaination">
          Since the government will provide your state pension, wet&#39;ll deduct this from your
          target retirement pot. We use todayt&#39;s maximum figure of £9,371.27 a year assuming you
          contribute National Insurance for 30 years.
        </TypographyWithTooltip>
      </Grid>
      <Grid item>
        <RadioGroup row>
          <>
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </>
        </RadioGroup>
      </Grid>
    </Grid>
  ),
};
