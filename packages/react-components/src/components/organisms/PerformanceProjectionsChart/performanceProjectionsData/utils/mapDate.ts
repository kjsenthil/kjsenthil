export default function mapDate<T>(d: T & { date: string }): T & { date: Date } {
  return {
    ...d,
    date: new Date(d.date),
  };
}
