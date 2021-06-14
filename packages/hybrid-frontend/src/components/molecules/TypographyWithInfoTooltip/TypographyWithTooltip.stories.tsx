import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import TypographyWithTooltip, { TypographyWithTooltipProps } from './TypographyWithTooltip';

export default {
  title: 'Digital Hybrid/Molecules/Typography With Tooltip',
  component: TypographyWithTooltip,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    tooltip: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

const Template: Story<TypographyWithTooltipProps> = (args) => (
  <div
    style={{
      width: 500,
    }}
  >
    <TypographyWithTooltip {...args} />
  </div>
);

const defaultArgs: TypographyWithTooltipProps = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  tooltip: 'Some tooltip',
};

export const Default = Template.bind({});
Default.args = defaultArgs;
