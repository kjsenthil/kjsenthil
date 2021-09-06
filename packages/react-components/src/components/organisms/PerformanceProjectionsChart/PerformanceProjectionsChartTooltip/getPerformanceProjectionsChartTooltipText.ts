import { getAgeText } from '../PerformanceProjectionsChartTickComponent/PerformanceProjectionsChartTickComponentBottomAxis';

export interface GetPerformanceProjectionsChartTooltipTextProps {
  tooltipDate: Date;
  todayAge: number | undefined;
}

export default function getPerformanceProjectionsChartTooltipText({
  tooltipDate,
  todayAge,
}: GetPerformanceProjectionsChartTooltipTextProps): string {
  const todayYear = new Date().getFullYear();
  const tooltipYear = tooltipDate.getFullYear();

  if (todayYear === tooltipYear) {
    return 'TODAY';
  }

  if (todayAge === undefined) {
    return `${tooltipYear}`;
  }

  return getAgeText({ tickYear: tooltipYear, todayAge });
}
