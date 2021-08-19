import { TimeSeriesDatum } from '../../../../../utils/data';
import {
  ProjectionsChartProjectionDatum,
  ProjectionsChartProjectionTargetDatum,
} from '../../../../../services/projections';

export function dateAccessor(d: TimeSeriesDatum): Date {
  return d.date;
}

export function upperBoundAccessor(d: ProjectionsChartProjectionDatum): number {
  return d.upperBound;
}

export function lowerBoundAccessor(d: ProjectionsChartProjectionDatum): number {
  return d.lowerBound;
}

export function valueAccessor(d: ProjectionsChartProjectionDatum): number {
  return d.value;
}

export function contributionsAccessor(d: ProjectionsChartProjectionDatum): number {
  return d.netContributionsToDate;
}

export function valueTargetAccessor(d: ProjectionsChartProjectionTargetDatum): number {
  return d.value;
}
