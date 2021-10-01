import * as React from 'react';
import StyledQuestionContainer from './QuestionAnswerToggle.styles';
import { Typography } from '../../atoms';
import { ToggleGroup } from '..';
import { useBreakpoint } from '../../../hooks';

export interface QuestionAnswerToggleProps {
  question: string;
  answers: string[];
  selected: string;
  // function to pass in from parent component
  updateAnswer: (param: React.SetStateAction<string>) => void;
}

const QuestionAnswerToggle = ({
  question,
  answers,
  selected,
  updateAnswer,
}: QuestionAnswerToggleProps) => {
  const { isMobile } = useBreakpoint();

  const handleChange = (_event: any, newSelected: React.SetStateAction<string>) => {
    updateAnswer(newSelected);
  };

  return (
    <>
      <StyledQuestionContainer isMobile={isMobile}>
        <Typography variant="h5">{question}</Typography>
      </StyledQuestionContainer>
      <ToggleGroup
        type="unordered"
        handleChange={handleChange}
        values={answers}
        initialValue={selected}
      />
    </>
  );
};

export default QuestionAnswerToggle;
