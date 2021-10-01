import { Meta, Story } from '@storybook/react/types-6-0';
import * as React from 'react';
import InfoCard, { InfoCardProps } from './InfoCard';

export default {
  title: 'Digital Hybrid/Molecules/Info Card',
  component: InfoCard,
} as Meta;

const Template: Story<InfoCardProps> = (args) => <InfoCard {...args} />;

const defaultArgs = {
  title: 'How do we use this information?',
  content: `Having the correct exposure to risk is key to achieving your desired investment outcome.

Too much risk and you might find the occasional falls in value difficult to tolerate - plus you might not be able to fulfil your plans if a fall in value comes at the wrong time.

Too little risk and you sacrifice the opportunity to grow your wealth, which can limit your future spending power. 

These questions are the starting point for us to understand your appetite for risk. When you speak to a coach, they will introduce other ways of assessing your overall appetite, so that they can help you achieve your objectives.`,
};

export const Default = Template.bind({});
Default.args = defaultArgs;
