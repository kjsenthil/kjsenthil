import { PostGoalParams, RetirementInputs, GoalType } from '../types';
import createUncategorisedPayload from './createUncategorisedPayload';
import createRetirementPayload from './createRetirementPayload';

const determinePayload = <T extends GoalType>({ inputs, goalType }: PostGoalParams<T>) => {
  switch (goalType) {
    case GoalType.RETIREMENT:
      return createRetirementPayload(inputs as RetirementInputs);
    default:
      return createUncategorisedPayload();
  }
};

export default determinePayload;
