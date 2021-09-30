import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Label, { LabelProps } from './Label';

export default {
  title: 'Digital Hybrid/Molecules/Label',
  component: Label,
  argTypes: {},
} as Meta;

const Template: Story<LabelProps> = ({ ...args }) => <Label {...args} />;

const defaultArgs: LabelProps = {
  text: 'I am a label',
  color: 'primary',
  colorShade: 'main',
};

export const Default = Template.bind({});
Default.args = defaultArgs;
