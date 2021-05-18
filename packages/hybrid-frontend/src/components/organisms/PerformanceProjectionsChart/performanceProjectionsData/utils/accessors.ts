import { TimeSeriesDatum } from '../../../../../utils/data';
import { ProjectionsChartProjectionDatum } from '../../../../../services/projections';

export function dateAccessor(d: TimeSeriesDatum): Date {
  return d.date;
}

export function valueGoodAccessor(d: ProjectionsChartProjectionDatum): number {
  return d.valueGood;
}

export function valueBadAccessor(d: ProjectionsChartProjectionDatum): number {
  return d.valueBad;
}

export function valueAccessor(d: ProjectionsChartProjectionDatum): number {
  return d.value;
}

export function contributionsAccessor(d: ProjectionsChartProjectionDatum): number {
  return d.netContributionsToDate;
}

export function goalNotMetAccessor(d: ProjectionsChartProjectionDatum): number {
  return d.valueGoalNotMet ?? 0;
}
