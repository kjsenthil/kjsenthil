import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import DirectDebitGuarantee from './DirectDebitGuarantee';

export default {
  title: 'Digital Hybrid/Organisms/Direct Debit Guarantee',
  component: DirectDebitGuarantee,
} as Meta;

const Template: Story = () => <DirectDebitGuarantee />;

export const Default = Template.bind({});
