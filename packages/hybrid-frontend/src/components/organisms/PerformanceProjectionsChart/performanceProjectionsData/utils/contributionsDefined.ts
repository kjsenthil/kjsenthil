import { ProjectionsChartProjectionDatum } from '../../../../../services/projections';

/**
 * This is a d3-style "defined" function. SVG paths are only drawn when this
 * function returns true. Used when we want to "hide" certain bits of a graph,
 * for example.
 */
export default function contributionsDefined(d: ProjectionsChartProjectionDatum): boolean {
  return d.netContributionsToDate > 0;
}
