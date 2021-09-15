import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ShareDetails, { ShareDetailsProps } from './ShareDetails';

export default {
  title: 'Digital Hybrid/Organisms/Share Details',
  component: ShareDetails,
  argTypes: {},
} as Meta;

const defaultArgs: ShareDetailsProps = {
  indicativePrice: '4.00p',
  indicativePriceTime: new Date('2021-12-11 13:10:00'),
  cashAvailable: '£12,000.00',
  riskWarningNoticeHref: '',
  keyInvestorInformationDocumentRef: '',
  /* eslint-disable-next-line no-alert */
  onCostAndChargesClick: () => alert('Show cost and charges'),
};

const Template: Story<ShareDetailsProps> = (args) => <ShareDetails {...args} />;

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
