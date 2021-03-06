import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Icon, TagBox, ReceiptCard, Typography } from '@tswdts/react-components';
import ShareDealingLayout, { ShareDealingLayoutProps } from './ShareDealingLayout';

export default {
  title: 'Digital Hybrid/Templates/Share Dealing Layout',
  component: ShareDealingLayout,
  // TODO:
  argTypes: {},
} as Meta;

const Template: Story<ShareDealingLayoutProps> = (args) => <ShareDealingLayout {...args} />;

const receiptCardProps = {
  listHeader: { key: 'Details of your transaction', value: 'Summary cost' },
  items: [
    { key: 'Order Reference No.', value: 'BI - 12345678' },
    { key: 'Order Placed on', value: '2021-07-01' },
    { key: 'Order Expiry Date', value: 'N/A' },
    { key: 'Order Status', value: <TagBox variant="percentage">Pending</TagBox> },
    { key: 'Epic Code', value: 'BEM' },
    { key: 'Shares', value: 942 },
    { key: 'Quote & deal price', value: '1.00p' },
    { key: 'Order charges', value: '£7.50' },
  ],
  total: { key: 'Total order amount', value: '£1200.0' },
};

const cardHeader = (
  <>
    <Typography variant="sh5" color="grey" colorShade="dark1">
      STOCKS & SHARES ISA
    </Typography>
    <Typography variant="h3">Beowul mining</Typography>
  </>
);

const defaultArgs: Partial<ShareDealingLayoutProps> = {
  open: true,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  children: <ReceiptCard {...receiptCardProps} />,
  titleText: 'Beowulf mining',
  titleSubText: 'Stocks & shares ISA',
  primaryActionProps: {
    children: 'Continue',
  },
  secondaryActionProps: {
    children: 'Cancel',
    startIcon: <Icon name="cross" />,
  },
};

export const EndState = Template.bind({});
EndState.args = {
  ...defaultArgs,
  isEndState: true,
  titleText: 'Success!',
  titleSubText: "We've received your request to buy shares.",
  primaryActionProps: {
    children: 'View transactions',
  },
  secondaryActionProps: {
    children: 'Place another order',
  },
  children: <ReceiptCard {...receiptCardProps} cardHeader={cardHeader} listHeader={undefined} />,
};
