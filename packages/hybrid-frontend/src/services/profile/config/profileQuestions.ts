import countries from './countries';

export type ProfileQuestion<T = void> = {
  question: string;
  type: 'bool' | 'text' | 'options';
  options?: T extends void ? undefined : Array<T>;
  answer: string | null;
  subQuestionAnswer?: Omit<ProfileQuestion<T>, 'subQuestionAnswer'>;
};

export const fatcaQuestions: Array<ProfileQuestion> = [
  { question: 'What is your source of wealth?', type: 'text', answer: null },
  {
    question: 'What is your occupation and name of employer?',
    type: 'text',
    answer: null,
  },
  {
    question: 'Do you have a business or residence in %country%?',
    type: 'bool',
    answer: null,
  },
  {
    question: 'How long have you lived outside of %country%?',
    type: 'text',
    answer: null,
  },
  {
    question: 'Do you return to %country% on a regular basis?',
    type: 'bool',
    answer: null,
    subQuestionAnswer: { question: 'How frequently?', type: 'text', answer: null },
  },
  {
    question: 'Do you have family in %country%?',
    type: 'bool',
    answer: null,
    subQuestionAnswer: { question: 'Family relationship?', type: 'text', answer: null },
  },
  {
    question: 'Are you connected to the government of %country%?',
    type: 'bool',
    answer: null,
    subQuestionAnswer: { question: 'Nature of association', type: 'text', answer: null },
  },
  {
    question: 'Do you send or receive money from %country%?',
    type: 'bool',
    answer: null,
    subQuestionAnswer: { question: 'How often and why?', type: 'text', answer: null },
  },
];

export const tinQuestions: Array<ProfileQuestion<{ code: string; name: string }>> = [
  {
    question: 'In which other country are you a tax resident?',
    type: 'options',
    options: countries,
    answer: null,
  },
  {
    question: 'Have you been issued with a tax identification number in this country?',
    type: 'bool',
    answer: null,
    subQuestionAnswer: {
      question: 'Please enter your foreign tax identification number',
      answer: null,
      type: 'text',
    },
  },
];
