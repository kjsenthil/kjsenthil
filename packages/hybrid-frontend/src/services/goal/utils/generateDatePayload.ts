import { GoalPayloadValType } from '../types';

const generateDatePayload = (date?: string): GoalPayloadValType<string, 'Date'> => {
  const currDate = new Date();

  return {
    _val: date || currDate.toISOString().split('T')[0],
    _type: 'Date',
  };
};

export default generateDatePayload;
