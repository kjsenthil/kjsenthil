import { valueTargetAccessor, lowerBoundAccessor, upperBoundAccessor } from './accessors';
import {
  ProjectionsChartProjectionDatum,
  ProjectionsChartProjectionTargetDatum,
} from '../../../../../services/projections';

const mockProjectionDatum: ProjectionsChartProjectionDatum = {
  netContributionsToDate: 10000,
  upperBound: 20000,
  lowerBound: 5000,
  value: 12000,
  date: new Date(2029, 0, 1),
};
const mockProjectionTargetDatum: ProjectionsChartProjectionTargetDatum = {
  value: 30000,
  date: new Date(2029, 0, 1),
};

describe('upperBoundAccessor', () => {
  it('works as expected', () => {
    expect(upperBoundAccessor(mockProjectionDatum)).toBe(20000);
  });
});

describe('lowerBoundAccessor', () => {
  it('works as expected', () => {
    expect(lowerBoundAccessor(mockProjectionDatum)).toBe(5000);
  });
});

describe('valueTargetAccessor', () => {
  it('works as expected', () => {
    expect(valueTargetAccessor(mockProjectionTargetDatum)).toBe(30000);
  });
});
