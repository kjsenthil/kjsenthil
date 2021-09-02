import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import AddCashModal, { AddCashModalProps } from './AddCashModal';

export default {
  title: 'Digital Hybrid/Organisms/Add Cash Modal',
  component: AddCashModal,
} as Meta;

const defaultArgs: AddCashModalProps = {
  title: 'Add Cash',
  subTitle: 'STOCK & SHARE ISA',
  accountType: 'ISA',
  isOpen: true,
  minAmount: 0,
  maxAmount: 100,
  onClose: () => false,
};

const Template: Story<AddCashModalProps> = ({ ...args }) => <AddCashModal {...args} />;

export const Default = Template.bind({});
Default.args = defaultArgs;
