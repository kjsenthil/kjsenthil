import { Interpreter } from 'xstate';
import { RiskModel } from '@tswdts/react-components';
import useLifePlanMachineHandlers, {
  LifePlanMachineHandlers,
  InputEvent,
} from './useLifePlanMachineHandlers';
import useUpdateSimulateProjectionsPrerequisites from '../useUpdateSimulateProjectionsPrerequisites';
import {
  LifePlanMachineContext,
  LifePlanMachineEvents,
  LifePlanMachineSchema,
} from '../../services/goal/machines/lifePlan';
import context from '../../services/goal/machines/lifePlan/context';

jest.mock('../useUpdateSimulateProjectionsPrerequisites', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseUpdateSimulateProjectionsPrerequisites = useUpdateSimulateProjectionsPrerequisites as jest.Mock;

const cast = (event: Object) => (event as unknown) as InputEvent;

describe('useLifePlanMachineHandlers', () => {
  let handlers: LifePlanMachineHandlers;
  let mockSend: jest.Mock;

  const prerequisites = {
    portfolioCurrentValue: 0,
    monthlyContributions: 0,
    totalNetContributions: 0,
    assetModel: {
      id: 111,
      riskModel: RiskModel.TAA1,
      erValue: 0,
      volatility: 0,
      zScores: {
        moreLikelyLb: 0,
        moreLikelyUb: 0,
        lessLikleyLb: 0,
        lessLikelyUb: 0,
      },
    },
  };

  const ctx = { ...context, drawdownStartAge: 65, drawdownEndAge: 89 };

  beforeEach(() => {
    mockUseUpdateSimulateProjectionsPrerequisites.mockReturnValue(prerequisites);
    mockSend = (jest.fn() as unknown) as jest.Mock<
      Interpreter<LifePlanMachineContext, LifePlanMachineSchema, LifePlanMachineEvents>['send']
    >;
    handlers = useLifePlanMachineHandlers({
      send: mockSend,
      context: ctx,
    });
  });

  it('calls send with SAVE on handleGoalSave with prerequisites', () => {
    handlers.handleGoalSave();
    expect(mockSend).toHaveBeenCalledWith('SAVE', { payload: prerequisites });
  });

  it('calls send with DELETE on handleGoalDelete without prerequisites', () => {
    handlers.handleGoalDelete();
    expect(mockSend).toHaveBeenCalledWith('DELETE');
  });

  it('calls send with SET_DRAWDOWN_AGES on handleFromAgeChange', () => {
    handlers.handleFromAgeChange(cast({ target: { value: '65' } }));
    expect(mockSend).toHaveBeenCalledWith('SET_DRAWDOWN_AGES', {
      payload: { drawdownStartAge: 65, drawdownEndAge: ctx.drawdownEndAge },
    });
  });

  it('calls send with SET_DRAWDOWN_AGES on handleToAgeChange', () => {
    handlers.handleToAgeChange(cast({ target: { value: '90' } }));
    expect(mockSend).toHaveBeenCalledWith('SET_DRAWDOWN_AGES', {
      payload: { drawdownEndAge: 90, drawdownStartAge: ctx.drawdownStartAge },
    });
  });

  it('calls send with SET_DRAWDOWN_AGES on handleToAgeChange defaulting to 0', () => {
    handlers.handleToAgeChange(cast({ target: { value: undefined } }));
    expect(mockSend).toHaveBeenCalledWith('SET_DRAWDOWN_AGES', {
      payload: { drawdownEndAge: 0, drawdownStartAge: ctx.drawdownStartAge },
    });
  });

  it('calls send with SET_INCOME on handleAnnualIncomeChange with normalized event target value and prerequisites', () => {
    handlers.handleAnnualIncomeChange(cast({ target: { value: '100,000' } }));
    expect(mockSend).toHaveBeenCalledWith('SET_INCOME', {
      payload: { annualIncome: 100000, ...prerequisites },
    });
  });

  it('calls send with SET_INCOME on handleAnnualIncomeChange with event target value defaulting to 0 and prerequisites', () => {
    handlers.handleAnnualIncomeChange(cast({ target: { value: undefined } }));
    expect(mockSend).toHaveBeenCalledWith('SET_INCOME', {
      payload: { annualIncome: 0, ...prerequisites },
    });
  });

  it('calls send with SET_INCOME on handleMonthlyIncomeChange with normalized event target value and prerequisites', () => {
    handlers.handleMonthlyIncomeChange(cast({ target: { value: '10,000.01' } }));
    expect(mockSend).toHaveBeenCalledWith('SET_INCOME', {
      payload: { monthlyIncome: 10000.01, ...prerequisites },
    });
  });

  it('calls send with SET_INCOME on handleMonthlyIncomeChange with event target value defaulting to 0 and prerequisites', () => {
    handlers.handleMonthlyIncomeChange(cast({ target: { value: undefined } }));
    expect(mockSend).toHaveBeenCalledWith('SET_INCOME', {
      payload: { monthlyIncome: 0, ...prerequisites },
    });
  });

  it('calls send with SET_LUMP_SUM_AMOUNT on handleLumpSumAmountChange with normalized event target value and prerequisites', () => {
    handlers.handleLumpSumAmountChange(cast({ target: { value: '200,000' } }));
    expect(mockSend).toHaveBeenCalledWith('SET_LUMP_SUM_AMOUNT', {
      payload: { lumpSum: 200000, ...prerequisites },
    });
  });

  it('calls send with SET_LUMP_SUM_AMOUNT on handleLumpSumAmountChange with event target value defaulting to 0 and prerequisites', () => {
    handlers.handleLumpSumAmountChange(cast({ target: { value: 0 } }));
    expect(mockSend).toHaveBeenCalledWith('SET_LUMP_SUM_AMOUNT', {
      payload: { lumpSum: 0, ...prerequisites },
    });
  });

  it('calls send with SET_LUMP_SUM_AGE on handleLumpSumAgeChange with event target value and prerequisites', () => {
    handlers.handleLumpSumAgeChange(cast({ target: { value: '65' } }));
    expect(mockSend).toHaveBeenCalledWith('SET_LUMP_SUM_AGE', {
      payload: { lumpSumAge: 65, ...prerequisites },
    });
  });

  it('calls send with SET_LUMP_SUM_AGE on handleLumpSumAgeChange with event target value defaulting to 0 and prerequisites', () => {
    handlers.handleLumpSumAgeChange(cast({ target: { value: undefined } }));
    expect(mockSend).toHaveBeenCalledWith('SET_LUMP_SUM_AGE', {
      payload: { lumpSumAge: 0, ...prerequisites },
    });
  });

  it('calls send with SET_LATER_LIFE_LEFT_OVER on handleRemainingAmountChange with normalized event target value and prerequisites', () => {
    handlers.handleRemainingAmountChange(cast({ target: { value: '20,000' } }));
    expect(mockSend).toHaveBeenCalledWith('SET_LATER_LIFE_LEFT_OVER', {
      payload: { laterLifeLeftOver: 20000, ...prerequisites },
    });
  });

  it('calls send with SET_INCLUDE_STATE_PENSION on handleStatePensionSelection with event target value as false and prerequisites', () => {
    handlers.handleStatePensionSelection(cast({ target: { value: 'false' } }));
    expect(mockSend).toHaveBeenCalledWith('SET_INCLUDE_STATE_PENSION', {
      payload: { shouldIncludeStatePension: false, ...prerequisites },
    });
  });

  it('calls send with SET_INCLUDE_STATE_PENSION on handleStatePensionSelection with event target value as true and prerequisites', () => {
    handlers.handleStatePensionSelection(cast({ target: { value: 'true' } }));
    expect(mockSend).toHaveBeenCalledWith('SET_INCLUDE_STATE_PENSION', {
      payload: { shouldIncludeStatePension: true, ...prerequisites },
    });
  });

  it('calls send with SET_ADDITIONAL_MONTHLY_CONTRIBUTIONS on handleAdditionalMonthlyContributions with event target value as 123 and prerequisites', () => {
    handlers.handleAdditionalMonthlyContributions(cast({ target: { value: '123' } }));
    expect(mockSend).toHaveBeenCalledWith('SET_ADDITIONAL_MONTHLY_CONTRIBUTIONS', {
      payload: { ...prerequisites, additionalMonthlyContributions: 123 },
    });
  });

  it('calls send with SET_UPFRONT_CONTRIBUTION on handleUpfrontContribution with event target value as 123 and prerequisites', () => {
    handlers.handleUpfrontContribution(cast({ target: { value: '123' } }));
    expect(mockSend).toHaveBeenCalledWith('SET_UPFRONT_CONTRIBUTION', {
      payload: { ...prerequisites, upfrontContribution: 123 },
    });
  });

  it('calls send with CUSTOM_EVENT on handleCustomEvent', () => {
    handlers.handleCustomEvent('CUSTOM_EVENT', { data: 'somedata' });
    expect(mockSend).toHaveBeenCalledWith('CUSTOM_EVENT', {
      payload: { data: 'somedata', ...prerequisites },
    });
  });

  it('calls send with CANCEL on handleCustomEvent', () => {
    handlers.handleCancellation();
    expect(mockSend).toHaveBeenCalledWith('CANCEL');
  });
});
