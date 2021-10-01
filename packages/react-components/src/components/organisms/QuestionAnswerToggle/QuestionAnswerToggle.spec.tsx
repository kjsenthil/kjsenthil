import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import QuestionAnswerToggle from './QuestionAnswerToggle';

describe('QuestionAnswerToggle', () => {
  const question = 'Does this test work?';
  const answers = ['yes', 'no', 'hopefully'];

  beforeEach(() => {
    renderWithTheme(
      <QuestionAnswerToggle
        updateAnswer={() => undefined}
        question={question}
        answers={answers}
        selected={answers[0]}
      />
    );
  });

  test('component renders correctly', () => {
    expect(screen.getByText('Does this test work?')).toBeInTheDocument();
    answers.forEach((answer) => expect(screen.getByText(answer)).toBeInTheDocument());
  });
});
