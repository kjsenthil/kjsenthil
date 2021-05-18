import { goalNotMetAccessor, valueBadAccessor, valueGoodAccessor } from './accessors';
import { ProjectionsChartProjectionDatum } from '../../../../../services/projections';

const mockDatum: ProjectionsChartProjectionDatum = {
  netContributionsToDate: 10000,
  valueGood: 20000,
  valueBad: 5000,
  value: 12000,
  date: new Date(2029, 0, 1),
};
const mockDatumGoalNotMet: ProjectionsChartProjectionDatum = {
  netContributionsToDate: 10000,
  valueGood: 20000,
  valueBad: 5000,
  value: 12000,
  date: new Date(2029, 0, 1),
  valueGoalNotMet: 30000,
};

describe('valueGoodAccessor', () => {
  it('works as expected', () => {
    expect(valueGoodAccessor(mockDatum)).toBe(20000);
  });
});

describe('valueBadAccessor', () => {
  it('works as expected', () => {
    expect(valueBadAccessor(mockDatum)).toBe(5000);
  });
});

describe('goalNotMetAccessor', () => {
  it('works as expected', () => {
    expect(goalNotMetAccessor(mockDatumGoalNotMet)).toBe(30000);
    expect(goalNotMetAccessor(mockDatum)).toBe(0);
  });
});
