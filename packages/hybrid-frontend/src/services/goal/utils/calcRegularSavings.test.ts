import calcRegularSavings from './calcRegularSavings';
import { CaptureGoalData } from '../types';
import { RiskAppetites } from '../constants';

describe('calcRegularSavings', () => {
  beforeEach(() => {
    Date.now = jest.fn().mockImplementation(() => new Date('2021-10-14T11:01:58.135Z').valueOf());
  });

  it('should return 0 if the target month is the same as current month', () => {
    const input: CaptureGoalData = {
      monthlyInvestment: 100,
      targetDate: new Date('2021-10-14T11:01:58.135Z'),
      riskAppetite: RiskAppetites.DEFENSIVE,
      targetAmount: 10,
      upfrontInvestment: 90,
    };
    const actual = calcRegularSavings(input);
    const expected = 0;
    expect(actual).toEqual(expected);
  });

  it('should return 0 if the target month is before current month', () => {
    const input: CaptureGoalData = {
      monthlyInvestment: 100,
      targetDate: new Date('2020-01-14T11:01:58.135Z'),
      riskAppetite: RiskAppetites.DEFENSIVE,
      targetAmount: 10,
      upfrontInvestment: 90,
    };
    const actual = calcRegularSavings(input);
    const expected = 0;
    expect(actual).toEqual(expected);
  });

  it('should return monthlyInvestment if the target month is after current month', () => {
    const input: CaptureGoalData = {
      monthlyInvestment: 100,
      targetDate: new Date('2022-12-14T11:01:58.135Z'),
      riskAppetite: RiskAppetites.DEFENSIVE,
      targetAmount: 10,
      upfrontInvestment: 90,
    };
    const actual = calcRegularSavings(input);
    const expected = 100;
    expect(actual).toEqual(expected);
  });

  it('should return regular saving value if the target month is after current month', () => {
    const input: CaptureGoalData = {
      monthlyInvestment: 0,
      targetDate: new Date('2022-12-14T11:01:58.135Z'),
      riskAppetite: RiskAppetites.DEFENSIVE,
      targetAmount: 1100,
      upfrontInvestment: 100,
    };
    const actual = calcRegularSavings(input);
    const expected = 71.42857142857143;
    expect(actual).toEqual(expected);
  });

  it('should return 0 value if the target amount and upfrontInvestment amount are same', () => {
    const input: CaptureGoalData = {
      monthlyInvestment: 0,
      targetDate: new Date('2022-12-14T11:01:58.135Z'),
      riskAppetite: RiskAppetites.DEFENSIVE,
      targetAmount: 100,
      upfrontInvestment: 100,
    };
    const actual = calcRegularSavings(input);
    const expected = 0;
    expect(actual).toEqual(expected);
  });
});
