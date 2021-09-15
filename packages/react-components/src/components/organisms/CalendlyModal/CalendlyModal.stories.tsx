import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import CalendlyModal, { CalendlyModalProps } from './CalendlyModal';

export default {
  title: 'Digital Hybrid/Organisms/Calendly Modal',
  component: CalendlyModal,
  argTypes: {
    prefillName: {
      control: { type: 'text' },
    },
    prefillEmail: {
      control: { type: 'text' },
    },
    prefill: {
      table: { disable: true },
    },
    open: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
    onClose: { action: 'onClose' },
  },
} as Meta;

interface StoryArgs extends Omit<CalendlyModalProps, 'prefill'> {
  prefillEmail?: string;
  prefillName?: string;
}

const Template: Story<StoryArgs> = ({ prefillName, prefillEmail, ...props }) => (
  <CalendlyModal prefill={{ name: prefillName, email: prefillEmail }} {...props} />
);

export const Default = Template.bind({});
Default.args = {
  prefillEmail: 'dr.who@bestinvest.co.uk',
  prefillName: 'Dr Who',
  calendlyUrl: 'https://calendly.com/tilney_poc/15min',
};
