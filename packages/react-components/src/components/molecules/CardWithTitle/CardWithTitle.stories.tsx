import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import CardWithTitle, { CardWithTitleProps } from './CardWithTitle';
import { Typography, Spacer } from '../../atoms';
import { FormInput } from '..';

export default {
  title: 'Digital Hybrid/Molecules/Card With Title',
  component: CardWithTitle,
} as Meta;

const Template: Story<CardWithTitleProps> = (args) => (
  <CardWithTitle {...args}>
    <Typography variant="sh1" color="grey" colorShade="dark1">
      What is your source of wealth?
    </Typography>
    <Spacer y={2} />
    <FormInput label="Start typing here" name="sourcewealth" fullWidth hideLabel />
    <Spacer y={3} />
    <Typography variant="sh1" color="grey" colorShade="dark1">
      What is your occupation and name of employer?
    </Typography>
    <Spacer y={2} />
    <FormInput label="Start typing here" name="occupationemployer" fullWidth hideLabel />
  </CardWithTitle>
);

const defaultArgs: CardWithTitleProps = {
  title: 'THAILAND',
};

export const Default = Template.bind({});

Default.args = defaultArgs;
