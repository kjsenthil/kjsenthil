import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Typography, { TypographyProps } from '.';

export default {
  title: 'Digital Hybrid/Atoms/Typography',
  component: Typography,
  argTypes: {
    variant: {
      control: {
        type: 'radio',
        options: [
          undefined,
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'sh1',
          'sh2',
          'sh3',
          'sh4',
          'b1',
          'b2',
          'b3',
        ],
      },
    },
    color: {
      control: {
        type: 'radio',
      },
      options: [undefined, 'black', 'white', 'primary', 'secondary', 'tertiary', 'grey'],
    },
    colorShade: {
      control: {
        type: 'radio',
      },
      options: [undefined, 'main', 'light1', 'light2', 'dark1', 'dark2'],
    },
  },
} as Meta;

const Template: Story<TypographyProps> = ({ ...args }) => (
  <div
    style={{
      padding: '4px',
      backgroundColor: args.color === 'white' ? 'grey' : 'white',
    }}
  >
    <Typography {...args} />
  </div>
);

const paragraph = 'Lorem ipsum dolor sit amet';

export const Default = Template.bind({});

Default.args = {
  children: paragraph,
};
