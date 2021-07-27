import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import RiskAppetiteCard, { RiskAppetiteCardProps } from './RiskAppetiteCard';

export default {
  title: 'Digital Hybrid/Organisms/Risk Appetite Card',
  component: RiskAppetiteCard,
} as Meta;

const defaultArgs: RiskAppetiteCardProps = {
  riskLevel: 6,
  onChange: () => {},
  max: 7,
  min: 1,
  step: 1,
  value: 4,
  startLabel: 'Low risk/reward',
  endLabel: 'High risk/reward',
  hereValue: 3,
  showMarks: true,
};

const Template: Story<RiskAppetiteCardProps> = ({ value: defaultValue, ...args }) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <RiskAppetiteCard {...args} onChange={(_name, newValue) => setValue(newValue)} value={value} />
  );
};

export const Default = Template.bind({});
Default.args = defaultArgs;
