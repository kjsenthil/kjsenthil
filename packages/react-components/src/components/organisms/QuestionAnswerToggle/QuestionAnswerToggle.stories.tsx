import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import QuestionAnswerToggle, { QuestionAnswerToggleProps } from './QuestionAnswerToggle';

export default {
  title: 'Digital Hybrid/Organisms/Question Answer Toggle',
  component: QuestionAnswerToggle,
} as Meta;

const defaultArgs: QuestionAnswerToggleProps = {
  question: 'Do you like this organism?',
  answers: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
  initialAnswerValue: 'Strongly disagree',
  updateAnswer: () => undefined,
};

const Template: Story<QuestionAnswerToggleProps> = ({ ...args }) => (
  <QuestionAnswerToggle {...args} />
);

export const Default = Template.bind({});
Default.args = defaultArgs;
