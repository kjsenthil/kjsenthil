import { assign, AssignAction } from 'xstate';
import {
  monthDifference,
  calculateAgeToday,
  calculateDateAfterYears,
  yearDifference,
} from '../../../../utils/date';
import {
  LifePlanMachineContext,
  LifePlanMachineEvents,
  SetAgesDrawdownEvent,
  SetIncomeEvent,
  SetLaterLifeLeftOverEvent,
  SetLumpSumEvent,
} from './types';
import * as math from '../../../../utils/math';

const setDrawdownAges = assign<LifePlanMachineContext, SetAgesDrawdownEvent>(
  (_, { payload: { drawdownStartAge, drawdownEndAge } }): Partial<LifePlanMachineContext> => ({
    drawdownStartAge,
    drawdownEndAge,
  })
);

const setIncome = assign<LifePlanMachineContext, SetIncomeEvent>(
  (ctx, { payload: { annualIncome, monthlyIncome } }) => {
    if (annualIncome !== undefined && monthlyIncome === undefined) {
      return {
        ...ctx,
        annualIncome,
        monthlyIncome: annualIncome / 12,
      };
    }
    if (annualIncome === undefined && monthlyIncome !== undefined) {
      return {
        ...ctx,
        monthlyIncome,
        annualIncome: monthlyIncome * 12,
      };
    }
    return {};
  }
);

const setLumpSum = assign<LifePlanMachineContext, SetLumpSumEvent>({
  lumpSum: (_, evt) => evt.payload.lumpSum,
});

const setLaterLifeLeftOver = assign<LifePlanMachineContext, SetLaterLifeLeftOverEvent>({
  laterLifeLeftOver: (_, evt) => evt.payload.laterLifeLeftOver,
});

const calculateDrawdownDates = assign<LifePlanMachineContext>(
  ({ userDateOfBirth, drawdownStartAge, drawdownEndAge }) => ({
    drawdownStartDate: calculateDateAfterYears(userDateOfBirth, drawdownStartAge),
    drawdownEndDate: calculateDateAfterYears(userDateOfBirth, drawdownEndAge),
  })
);

const calculateRetirementPotValue = assign<LifePlanMachineContext>({
  retirementPotValue: (ctx) => ctx.targetDrawdownAmount + ctx.laterLifeLeftOver + ctx.lumpSum,
});

const calculateAge = assign<LifePlanMachineContext>({
  userAge: ({ userDateOfBirth }) => (userDateOfBirth ? calculateAgeToday(userDateOfBirth) : 0),
});

const calculateAnnualNetExpectedReturn = assign<LifePlanMachineContext>({
  annualNetExpectedReturn: ({ expectedReturnOfTAA, fees }) => expectedReturnOfTAA - fees,
});

const calculateMonthlyNetExpectedReturn = assign<LifePlanMachineContext>({
  monthlyNetExpectedReturn: ({ annualNetExpectedReturn }) =>
    math.calculateMonthlyNetExpectedReturn({ annualNetExpectedReturn }),
});

const calculateDrawdownPeriodLength = assign<LifePlanMachineContext>(
  (ctx: LifePlanMachineContext): Partial<LifePlanMachineContext> => {
    if (ctx.drawdownStartDate && ctx.drawdownEndDate) {
      let drawdownStartDate = new Date(ctx.drawdownStartDate);

      if (ctx.userAge > ctx.drawdownStartAge) {
        drawdownStartDate = new Date();
      }

      return {
        drawdownPeriodLengthYears: Math.abs(yearDifference(ctx.drawdownEndDate, drawdownStartDate)),
        drawdownPeriodLengthMonths: Math.abs(
          monthDifference(ctx.drawdownEndDate, drawdownStartDate) + 1
        ),
      };
    }
    return ctx;
  }
);

const calculateTargetDrawdownAmount = assign<LifePlanMachineContext>({
  targetDrawdownAmount: (ctx) => ctx.monthlyIncome * ctx.drawdownPeriodLengthMonths,
});

const calculateTomorrowsMoney = assign<LifePlanMachineContext>(
  ({ inflation, drawdownStartDate, annualIncome }) => {
    const timePeriodInYears =
      (drawdownStartDate || new Date()).getFullYear() - new Date().getFullYear();
    const annualIncomeIntomorrowsMoney = math.calculateAnnualReturnAfterInflation({
      annualIncome,
      inflation,
      timePeriodInYears,
    });
    const monthlyIncomeIntomorrowsMoney = Math.round(annualIncomeIntomorrowsMoney / 12);
    return {
      annualIncomeIntomorrowsMoney,
      monthlyIncomeIntomorrowsMoney,
    };
  }
);

export default ({
  setIncome,
  setLumpSum,
  setDrawdownAges,
  setLaterLifeLeftOver,
  calculateAge,
  calculateDrawdownDates,
  calculateTomorrowsMoney,
  calculateRetirementPotValue,
  calculateTargetDrawdownAmount,
  calculateDrawdownPeriodLength,
  calculateAnnualNetExpectedReturn,
  calculateMonthlyNetExpectedReturn,
} as unknown) as AssignAction<LifePlanMachineContext, LifePlanMachineEvents>;
