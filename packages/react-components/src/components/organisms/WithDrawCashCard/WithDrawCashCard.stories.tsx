import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import WithDrawCashCard, { WithDrawCashCardProps } from './WithDrawCashCard';

export default {
  title: 'Digital Hybrid/Organisms/Withdraw Cash Card',
  component: WithDrawCashCard,
  argTypes: {},
} as Meta;

const Template: Story<WithDrawCashCardProps> = (args) => <WithDrawCashCard {...args} />;

const DefaultProps: WithDrawCashCardProps = {
  canTransferCash: true,
};

export const Default = Template.bind({});
Default.args = DefaultProps;
