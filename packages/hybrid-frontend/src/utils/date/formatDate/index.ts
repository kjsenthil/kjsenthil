import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);
dayjs.locale('en');

export default function formatDate(date: Date, format: string, humanize = false): string {
  if (dayjs(date).isToday() && humanize) return 'Today';

  return dayjs(date).format(format);
}
