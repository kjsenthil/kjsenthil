import generateCurrencyPayload from './generateCurrencyPayload';
import { goalsDefaultValues } from '../config';
import { GoalAdviceType, GoalCategory, RetirementInputs, RetirementPayload } from '../types';

const createRetirementPayload = ({
  drawdownStartAge,
  drawdownEndAge,
  regularDrawdown,
  lumpSum = 0.1,
  lumpSumDate,
  statePensionAmount = 0.1,
  laterLifeLeftOver = 0.1,
  description,
}: RetirementInputs): { fields: RetirementPayload } => ({
  fields: {
    ...goalsDefaultValues,
    category: GoalCategory.RETIREMENT,
    advice_type: GoalAdviceType.RETIREMENT,
    description: description || 'Life Plan Retirement',
    regular_drawdown: generateCurrencyPayload(regularDrawdown),
    objective_frequency_start_age: drawdownStartAge,
    objective_frequency_end_age: drawdownEndAge,
    drawdown_frequency: '12',
    bi_retirement_lump_sum: lumpSum,
    bi_retirement_lump_sum_date: lumpSumDate,
    bi_state_pension_amount: statePensionAmount,
    bi_retirement_remaining_amount: laterLifeLeftOver,
  },
});

export default createRetirementPayload;
