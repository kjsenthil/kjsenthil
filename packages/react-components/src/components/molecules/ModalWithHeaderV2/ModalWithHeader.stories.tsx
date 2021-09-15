import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ModalWithHeader, { ModalProps } from './ModalWithHeader';
import { Typography, Link, Spacer } from '../../atoms';

export default {
  title: 'Digital Hybrid/Molecules/Modal With Header V2',
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

const Template: Story<ModalProps> = (args) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Link onClick={() => setOpen(true)}>Open modal</Link>
      <ModalWithHeader {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

const defaultArgs: Partial<ModalProps> = {
  modalTitle: 'Add Cash',
  subTitle: 'STOCK & SHARES ISA',
  children: (
    <div style={{ textAlign: 'center' }}>
      <Spacer y={4} />
      <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
        modal container
      </Typography>
      <Spacer y={4} />
    </div>
  ),
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };

export const Process = Template.bind({});
Process.args = { ...defaultArgs, variant: 'Process' };

export const Confirmation = Template.bind({});
Confirmation.args = {
  ...defaultArgs,
  modalTitle: 'Success',
  subTitle: 'You have successfully done X',
  variant: 'Confirmation',
};
