import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import TodoCard, { TodoCardProps } from './TodoCard';
import { Spacer, Typography } from '../../atoms';

export default {
  title: 'Digital Hybrid/Organisms/Todo Card',
  component: TodoCard,
  argTypes: {
    onClick: { action: 'card clicked' },
  },
} as Meta;

const Template: Story<TodoCardProps> = (args) => <TodoCard {...args} />;

export const BasicCard = Template.bind({});
BasicCard.args = {
  title: 'Create a personal balance sheet',
  text: 'Track your assets and liabilities by creating a personal balance sheet.',
};

export const CardWithIcon = Template.bind({});
CardWithIcon.args = {
  iconProps: {
    name: 'account',
    color: 'primary',
  },
  title: 'Tell us more about you',
  text: 'Answer a few questions to give your coach a clearer picture of your finances.',
};

export const CardWithLabelAndIcon = Template.bind({});
CardWithLabelAndIcon.args = {
  iconProps: {
    name: 'account',
    color: 'primary',
  },
  labelProps: {
    text: 'In progress',
    color: 'grey',
    colorShade: 'main',
  },
  title: 'Tell us more about you',
  text: 'Answer a few questions to give your coach a clearer picture of your finances.',
};

export const CardWithLabelAndExtraContent = Template.bind({});
CardWithLabelAndExtraContent.args = {
  iconProps: {
    name: 'account',
    color: 'primary',
  },
  labelProps: {
    text: 'Completed',
    color: 'success',
    colorShade: 'main',
  },
  title: 'Tell us more about you',
  text: 'Answer a few questions to give your coach a clearer picture of your finances.',
  extraContent: (
    <>
      <Spacer y={0.75} />
      <Typography variant="sh2" color="primary" colorShade="light1">
        Re-take the questionnaire
      </Typography>
    </>
  ),
};
