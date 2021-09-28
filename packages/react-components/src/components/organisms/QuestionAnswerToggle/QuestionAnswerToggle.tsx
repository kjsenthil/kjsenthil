import * as React from 'react';
import { useState } from 'react';
import StyledQuestionContainer from './QuestionAnswerToggle.styles';
import { Typography } from '../../atoms';
import { UnorderedToggleButtonGroup } from '../../molecules';
import { useBreakpoint } from '../../../hooks';

export interface QuestionAnswerToggleProps {
  question: string;
  answers: string[];
  initialAnswerValue: string | React.SetStateAction<string>;
  // function to pass in from parent component
  updateAnswer: (param: { [x: string]: React.SetStateAction<string> }) => void;
}

const QuestionAnswerToggle = ({
  question,
  answers,
  initialAnswerValue,
  updateAnswer,
}: QuestionAnswerToggleProps) => {
  const { isMobile } = useBreakpoint();
  const [selected, setSelected] = useState({
    [question]: initialAnswerValue,
  });

  const handleChange = (_event: any, newSelected: React.SetStateAction<string>) => {
    setSelected({
      [question]: newSelected,
    });

    updateAnswer(selected);
  };

  return (
    <>
      <StyledQuestionContainer isMobile={isMobile}>
        <Typography variant="h5">{question}</Typography>
      </StyledQuestionContainer>
      <UnorderedToggleButtonGroup
        handleChange={handleChange}
        values={answers}
        initialValue={selected[question]}
      />
    </>
  );
};

export default QuestionAnswerToggle;
