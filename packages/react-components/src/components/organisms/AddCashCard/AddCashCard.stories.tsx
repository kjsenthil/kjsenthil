import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import AddCashCard, { AddCashCardProps } from './AddCashCard';
import { AccountType } from '../../../constants';

export default {
  title: 'Digital Hybrid/Organisms/Add Cash Card',
  component: AddCashCard,
  argTypes: {},
} as Meta;

const Template: Story<AddCashCardProps> = (args) => <AddCashCard {...args} />;

const DefaultProps: AddCashCardProps = {
  selectedAccountName: AccountType.ISA,
};
export const Default = Template.bind({});
Default.args = DefaultProps;
