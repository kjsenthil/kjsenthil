import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { DEFAULT_LOCALE } from '../../formatters/locale';

dayjs.extend(isToday);
dayjs.locale(DEFAULT_LOCALE);

export default function formatDate(date: Date, format: string, humanize = false): string {
  if (dayjs(date).isToday() && humanize) return 'Today';

  return dayjs(date).format(format);
}
