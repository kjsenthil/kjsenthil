import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import QuestionAnswerToggle, { QuestionAnswerToggleProps } from './QuestionAnswerToggle';

export default {
  title: 'Digital Hybrid/Organisms/Question Answer Toggle',
  component: QuestionAnswerToggle,
} as Meta;

type StoryQuestionAnswerToggleProps = Omit<QuestionAnswerToggleProps, 'selected' | 'updateAnswer'>;

const defaultArgs: StoryQuestionAnswerToggleProps = {
  question: 'Do you like this organism?',
  answers: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
};

const Template: Story<StoryQuestionAnswerToggleProps> = ({ ...args }) => {
  const [selected, setSelected] = useState('Strongly disagree');

  return <QuestionAnswerToggle {...args} updateAnswer={setSelected} selected={selected} />;
};

export const Default = Template.bind({});
Default.args = defaultArgs;
