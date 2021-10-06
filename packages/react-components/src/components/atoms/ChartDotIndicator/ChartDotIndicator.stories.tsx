import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ChartDotIndicator, { ChartDotIndicatorProps } from './ChartDotIndicator';

export default {
  title: 'Digital Hybrid/Atoms/Chart Dot Indicator',
  component: ChartDotIndicator,
  argTypes: {},
} as Meta;

const Template: Story<ChartDotIndicatorProps> = (args) => (
  <>
    <p>Background colour to show chart dot indicator</p>
    <svg width="100px" height="100px" style={{ backgroundColor: 'lightgrey' }}>
      <ChartDotIndicator {...args} />
    </svg>
  </>
);

const defaultArgs: ChartDotIndicatorProps = {
  color: 'blue',
  cx: 50,
  cy: 50,
};

export const Default = Template.bind({});
Default.args = defaultArgs;
