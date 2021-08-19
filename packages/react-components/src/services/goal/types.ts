// This kind of data is used by the projections chart
export interface ProjectionsChartGoalDatum {
  date: Date;
  label: string;
  icon: string;

  // If progress is undefined, the progress bar below the label won't be shown
  progress?: number;
}
