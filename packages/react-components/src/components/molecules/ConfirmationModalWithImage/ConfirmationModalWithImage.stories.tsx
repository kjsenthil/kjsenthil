import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ConfirmationModalWithImage, {
  ConfirmationModalWithImageProps,
} from './ConfirmationModalWithImage';

export default {
  title: 'Digital Hybrid/Molecules/Confirmation Modal With Image',
  component: ConfirmationModalWithImage,
  argTypes: {},
} as Meta;

const Template: Story<ConfirmationModalWithImageProps> = (args) => (
  <ConfirmationModalWithImage {...args} />
);

const DefaultProps: ConfirmationModalWithImageProps = {
  modalTitle: "Sorry, that didn't work",
  description: 'Please check your payment details and try again',
  modalImageSrc: '/success.png',
  modalImageAlt: 'Successful transaction',
  modalBackGroundImageSrc: '/pattern-bg.svg',
  modalBackGroundColor: '#f8f8fe',
  open: true,
};
export const Default = Template.bind({});
Default.args = DefaultProps;
