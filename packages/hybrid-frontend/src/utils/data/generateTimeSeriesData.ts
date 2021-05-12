export interface TimeSeriesDatum {
  date: Date;
  value: number;
}

export interface GenerateTimeSeriesDataProps {
  howMany: number;
  firstYear: number;
  firstMonth: number;
  firstDate: number;
  firstValue: number;
  valueIncrement: number;
}

export const defaultGenerateTimeSeriesDataProps: GenerateTimeSeriesDataProps = {
  howMany: 10,
  firstYear: 2020,
  firstMonth: 0,
  firstDate: 1,
  firstValue: 1000,
  valueIncrement: 10,
};

export function generateTimeSeriesData({
  howMany,
  firstYear,
  firstMonth,
  firstDate,
  firstValue,
  valueIncrement,
}: GenerateTimeSeriesDataProps = defaultGenerateTimeSeriesDataProps): TimeSeriesDatum[] {
  const data: TimeSeriesDatum[] = [];

  for (let i = 0; i < howMany; i += 1) {
    data.push({
      date: new Date(firstYear, firstMonth, firstDate + i),
      value: firstValue + i * valueIncrement,
    });
  }

  return data;
}
