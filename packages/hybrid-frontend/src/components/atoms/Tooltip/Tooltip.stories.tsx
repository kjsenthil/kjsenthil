import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Tooltip, { TooltipProps } from './Tooltip';

export default {
  title: 'Digital Hybrid/Atoms/Tooltip',
  component: Tooltip,
  argTypes: {
    placement: {
      control: {
        type: 'radio',
      },
      options: [undefined, 'top', 'right', 'bottom', 'left'],
    },
    title: {
      control: {
        type: 'text',
      },
    },
    arrow: {
      control: {
        type: 'boolean',
      },
    },
    enterDelay: {
      control: {
        type: 'number',
      },
    },
    leaveDelay: {
      control: {
        type: 'number',
      },
    },
  },
} as Meta;

const Template: Story<TooltipProps> = (args) => (
  <div
    style={{
      padding: '100px',
    }}
  >
    <Tooltip {...args}>
      <a href="#">Test your Tooltip</a>
    </Tooltip>
  </div>
);

const defaultArgs: TooltipProps = {
  arrow: true,
  children: <a href="#">Test your Tooltip</a>,
  enterDelay: 100,
  leaveDelay: 300,
  title: 'Tooltip',
};

export const Default = Template.bind({});
Default.args = defaultArgs;
