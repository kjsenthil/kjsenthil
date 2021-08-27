import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SuccessModal, { SuccessModalProps } from './SuccessModal';

export default {
  title: 'Digital Hybrid/Organisms/Success Modal',
  component: SuccessModal,
  argTypes: {},
} as Meta;

const Template: Story<SuccessModalProps> = (args) => <SuccessModal {...args} />;

const DefaultProps: SuccessModalProps = {
  title: 'Success!',
  accountName: 'ISA',
  amount: 100,
  isOpen: true,
  imgSrc: '/success.png',
  imgAlt: 'Successful transaction',
};
export const Default = Template.bind({});
Default.args = DefaultProps;
