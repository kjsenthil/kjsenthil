import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import GoalInputCard, { GoalInputCardProps } from './GoalInputCard';

export default {
  title: 'Digital Hybrid/Organisms/Goal Input Card',
  component: GoalInputCard,
} as Meta;

const defaultArgs: GoalInputCardProps = {
  type: 'monthly',
  onTrack: 334,
  value: '',
  onChange: () => {},
};

const Template: Story<GoalInputCardProps> = ({ ...args }) => {
  const [value, setValue] = React.useState(args.value);

  return (
    <GoalInputCard {...args} onChange={(_name, newValue) => setValue(newValue)} value={value} />
  );
};

export const Default = Template.bind({});
Default.args = defaultArgs;
