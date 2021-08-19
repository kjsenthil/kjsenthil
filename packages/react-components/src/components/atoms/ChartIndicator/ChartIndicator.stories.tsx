import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ChardIndicator, { ChartIndicatorProps } from './ChartIndicator';

export default {
  title: 'Digital Hybrid/Atoms/Chart Indicator',
  component: ChardIndicator,
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: ['solid', 'dashed-3', 'dashed-4', 'rectangle'],
    },
    color: {
      control: {
        type: 'radio',
      },
      options: ['primary', 'tertiary', 'grey', 'gold'],
    },
    colorShade: {
      control: {
        type: 'radio',
      },
      options: ['light1', 'light2', 'main', 'dark1', 'dark2'],
    },
  },
} as Meta;

const Template: Story<ChartIndicatorProps> = (args) => <ChardIndicator {...args} />;

const defaultArgs: ChartIndicatorProps = {
  variant: 'solid',
};

export const Default = Template.bind({});
Default.args = defaultArgs;
