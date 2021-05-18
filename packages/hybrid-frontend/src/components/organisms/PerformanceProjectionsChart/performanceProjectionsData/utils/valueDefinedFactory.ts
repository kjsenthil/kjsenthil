import { ProjectionsChartProjectionDatum } from '../../../../../services/projections';

export default function valueDefinedFactory(
  zeroValueYear: number
): (d: ProjectionsChartProjectionDatum) => boolean {
  return (d: ProjectionsChartProjectionDatum) => d.date.getFullYear() <= zeroValueYear;
}
