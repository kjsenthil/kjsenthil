import { timeFormatLocale } from 'd3-time-format';

export const d3TimeLocale = timeFormatLocale({
  dateTime: '%a %e %b %X %Y',
  date: '%d/%m/%Y',
  time: '%H:%M:%S',
  periods: ['AM', 'PM'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  shortMonths: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
});

export enum D3TimeFormatterType {
  DATE_AND_MONTH = 'DATE_AND_MONTH',
  MONTH_ONLY = 'MONTH_ONLY',
  'YEAR_AND_MONTH' = 'YEAR_AND_MONTH',
  YEAR_ONLY = 'YEAR_ONLY',
}

export const d3TimeFormatter: Record<D3TimeFormatterType, (d: Date) => string> = {
  DATE_AND_MONTH: d3TimeLocale.format('%e %b'),
  MONTH_ONLY: d3TimeLocale.format('%b'),
  YEAR_AND_MONTH: d3TimeLocale.format('%b %Y'),
  YEAR_ONLY: d3TimeLocale.format('%Y'),
};
