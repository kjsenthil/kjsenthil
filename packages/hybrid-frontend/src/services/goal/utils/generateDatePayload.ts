import { GoalDateValType } from '../types';

const generateDatePayload = (date?: string): GoalDateValType => {
  const currDate = new Date();

  return {
    _val: date || currDate.toISOString().split('T')[0],
    _type: 'Date',
  };
};

export default generateDatePayload;
