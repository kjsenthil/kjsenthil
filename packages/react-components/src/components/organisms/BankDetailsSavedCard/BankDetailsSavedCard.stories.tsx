import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import BankDetailsSavedCard, { BankDetailsValuesProps } from './BankDetailsSavedCard';

export default {
  title: 'Digital Hybrid/Organisms/BankDetailsSavedCard',
  component: BankDetailsSavedCard,
} as Meta;

const Template: Story<BankDetailsValuesProps> = (args) => <BankDetailsSavedCard {...args} />;

const defaultArgs: BankDetailsValuesProps = {
  accountNumberValue: 'xxxxxx14',
  sortcodeValue: 'xx-xx-11',
  bankDetailsEditUrl: '/',
};

export const Default = Template.bind({});
Default.args = defaultArgs;
