const mapPerformanceData = <T extends { date: string; value: number }>(
  d: T
): { date: Date; value: number } => ({
  date: new Date(`${d.date}Z`),
  value: d.value,
});

export default mapPerformanceData;
