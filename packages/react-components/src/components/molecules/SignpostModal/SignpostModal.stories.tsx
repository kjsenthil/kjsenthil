import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button, Icon, Typography } from '../../atoms';
import SignpostModal, { SignpostModalProps } from './SignpostModal';
import imageFile from '../../../assets/img/coach.png';

export default {
  title: 'Digital Hybrid/Molecules/Signpost Modal',
  component: SignpostModal,
  argTypes: {},
} as Meta;

const Template: Story<SignpostModalProps> = (args) => <SignpostModal {...args} />;

const content = <Typography variant="b2">Lorem ipsum, dolor sit amet.</Typography>;
const button = (
  <Button startIcon={<Icon name="calendar" />} color="gradient">
    Button
  </Button>
);
const requiredProps = {
  title: 'Title',
  content,
  button,
};

export const Default = Template.bind({});
Default.args = {
  ...requiredProps,
  image: <img src={imageFile} alt="Portrait of a coach" width="100%" />,
};

export const NoImage = Template.bind({});
NoImage.args = requiredProps;
