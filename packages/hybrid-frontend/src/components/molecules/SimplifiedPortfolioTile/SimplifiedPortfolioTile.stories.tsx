import { Meta, Story } from '@storybook/react/types-6-0';
import * as React from 'react';
import SimplifiedPortfolioTile, { SimplifiedPortfolioTileProps } from './SimplifiedPortfolioTile';

export default {
  title: 'Digital Hybrid/Molecules/Simplified Portfolio Tile',
  component: SimplifiedPortfolioTile,
} as Meta;

const Template: Story<SimplifiedPortfolioTileProps> = (args) => (
  <SimplifiedPortfolioTile {...args} />
);

export const Default = Template.bind({});
Default.args = {
  portfolioName: "Partner's retirement",
  abbreviatedAccountTypes: ['SIPP', 'ISA'],
  total: '£62,455.45',
};

export const LongTitleAndLargeTotal = Template.bind({});
LongTitleAndLargeTotal.args = {
  portfolioName: 'Retirement fund for my wife and I to go sailing around the Bahamas on our yacht',
  abbreviatedAccountTypes: ['SIPP', 'ISA'],
  total: '£2,392,423.00',
};
