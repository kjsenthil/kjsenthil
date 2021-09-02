import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ModalWithHeader, { ModalProps } from './ModalWithHeader';
import { Typography } from '../../atoms';

export default {
  title: 'Digital Hybrid/Molecules/Modal With Header',
  component: ModalWithHeader,
  argTypes: {
    open: {
      control: {
        type: 'boolean',
      },
      options: ['True', 'False'],
    },
  },
} as Meta;

const Template: Story<ModalProps> = (args) => <ModalWithHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  open: true,
  modalTitle: 'Add Cash',
  subTitle: 'STOCK & SHARES ISA',
  variant: 'withSubTitle',
  children: (
    <>
      <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
        modal container
      </Typography>
    </>
  ),
};
