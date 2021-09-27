import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ShareOrderForm, { ShareOrderFormProps } from './ShareOrderForm';

export default {
  title: 'Digital Hybrid/Organisms/Share Order Form',
  component: ShareOrderForm,
} as Meta;

const defaultArgs: Partial<ShareOrderFormProps> = {
  numOfUnits: '',
  numOfUnitsError: '',
  handleNumOfUnitsChange: () => {},

  isMarketOpen: true,

  executionType: 'market',

  desiredValue: '',
  desiredValueError: '',
  handleDesiredValueChange: () => {},

  amountInPence: '',
  amountInPenceError: '',
  handleAmountInPenceChange: () => {},

  numberOfDays: '',
  numberOfDaysError: '',
  handleExpireAfterDaysChange: () => {},

  maxCashAvailable: '1200',
};

const Template: Story<ShareOrderFormProps> = ({ ...args }) => {
  const [executionType, setExecutionType] = React.useState<'market' | 'limit'>('market');

  return (
    <ShareOrderForm {...args} executionType={executionType} setExecutionType={setExecutionType} />
  );
};

export const Buy = Template.bind({});
Buy.args = { ...defaultArgs, orderType: 'Buy' };

export const Sell = Template.bind({});
Sell.args = { ...defaultArgs, orderType: 'Sell' };
