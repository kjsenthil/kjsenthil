const mapContributionsData = <T extends { date: string; netContributionsToDate: number }>(
  d: T
): { date: Date; value: number } => ({
  date: new Date(`${d.date}Z`),
  value: d.netContributionsToDate,
});

export default mapContributionsData;
