import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import GoalSetUpNewCard, { GoalSetUpNewCardProps } from './GoalSetUpNewCard';
import image from '../../../assets/img/dogpaper.png';

export default {
  title: 'Digital Hybrid/Organisms/Goal Set Up New Card',
  component: GoalSetUpNewCard,
  decorators: [
    (StoryComponent) => (
      <div style={{ width: 349 }}>
        <StoryComponent />
      </div>
    ),
  ],
  argTypes: {
    // custom argTypes here...
  },
} as Meta;

const Template: Story<GoalSetUpNewCardProps> = (args) => <GoalSetUpNewCard {...args} />;

const defaultArgs: GoalSetUpNewCardProps = {
  imgProps: {
    src: image,
    alt: 'dog holding newspaper',
  },
};

export const Default = Template.bind({});
Default.args = defaultArgs;
