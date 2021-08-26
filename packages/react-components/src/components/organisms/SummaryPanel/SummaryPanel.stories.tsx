import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SummaryPanel, { SummaryPanelProps } from './SummaryPanel';

export default {
  title: 'Digital Hybrid/Organisms/Summary Panel',
  component: SummaryPanel,
  argTypes: {},
} as Meta;

const Template: Story<SummaryPanelProps> = (args) => <SummaryPanel {...args} />;

const defaultArgs: SummaryPanelProps = {
  totalNetContributions: 120726.83,
  lifetimeReturn: 27512.14,
  lifetimeReturnPercentage: 0.2534,
  annualisedReturnPercentage: 0.2,
  periodBasedReturn: {
    value: 7632.04,
    percent: 0.4511,
    label: 'LAST 3 MONTHS RETURN',
  },
};

export const Default = Template.bind({});
Default.args = defaultArgs;
