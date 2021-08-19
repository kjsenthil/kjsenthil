import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import FormInput from '../FormInput';
import ComponentsWithCaption, { ComponentsWithCaptionProps } from './ComponentsWithCaption';
import { Button } from '../../atoms';

export default {
  title: 'Digital Hybrid/Molecules/Container With Caption',
  component: ComponentsWithCaption,
  argTypes: {
    caption: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

const Template: Story<ComponentsWithCaptionProps> = (args) => <ComponentsWithCaption {...args} />;

export const SingleFormInputsWithCaption = Template.bind({});
SingleFormInputsWithCaption.args = {
  caption: 'Here is the caption',
  children: <FormInput name="input" label="Input" value="" />,
};

export const MultipleFormInputsWithCaption = Template.bind({});
MultipleFormInputsWithCaption.args = {
  caption: 'Here is the caption',
  children: (
    <>
      <FormInput name="input-1" label="Input 1" value="" />
      <FormInput name="input-2" label="Input 2" value="" />
      <FormInput name="input-3" label="Input 3" value="" />
      <FormInput name="input-4" label="Input 3" value="" />
    </>
  ),
};

export const ButtonWithCaption = Template.bind({});
ButtonWithCaption.args = {
  caption: 'Here is the caption',
  children: (
    <Button color="primary" variant="contained">
      Button
    </Button>
  ),
};
