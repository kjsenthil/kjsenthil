import MockDate from 'mockdate';
import {
  getDayArrayBackwardsFactory,
  getLastDayOfMonth,
  getMonthArrayBackwardsFactory,
  getWeekArrayBackwardsFactory,
  getYearArrayBackwardsFactory,
} from './performanceChart';

describe('performance chart', () => {
  MockDate.set('2021-09-27');

  test('getLastDayOfMonth', () => {
    expect(getLastDayOfMonth(new Date()).toString().slice(0, 15)).toBe('Thu Sep 30 2021');
  });

  test('getDayArrayBackwardsFactory', () => {
    const dayArrayFunction = getDayArrayBackwardsFactory(7);
    const dayArray = dayArrayFunction(new Date()).map((day) => day.toString().slice(0, 15));
    expect(dayArray).toStrictEqual([
      'Tue Sep 28 2021',
      'Mon Sep 27 2021',
      'Sun Sep 26 2021',
      'Sat Sep 25 2021',
      'Fri Sep 24 2021',
      'Thu Sep 23 2021',
      'Wed Sep 22 2021',
      'Tue Sep 21 2021',
    ]);
  });

  test('getWeekArrayBackwardsFactory', () => {
    const weekArrayFunction = getWeekArrayBackwardsFactory(4);
    const weekArray = weekArrayFunction(new Date()).map((week) => week.toString().slice(0, 15));
    expect(weekArray).toStrictEqual([
      'Mon Sep 27 2021',
      'Mon Sep 20 2021',
      'Mon Sep 13 2021',
      'Mon Sep 06 2021',
      'Mon Aug 30 2021',
    ]);
  });

  test('getMonthArrayBackwardsFactory', () => {
    const monthArrayFunction = getMonthArrayBackwardsFactory(3);
    const monthArray = monthArrayFunction(new Date()).map((month) => month.toString().slice(0, 15));
    expect(monthArray).toStrictEqual([
      'Fri Oct 01 2021',
      'Wed Sep 01 2021',
      'Sun Aug 01 2021',
      'Thu Jul 01 2021',
    ]);
  });

  test('getYearArrayBackwardsFactory', () => {
    const yearArrayFunction = getYearArrayBackwardsFactory(5);
    const yearArray = yearArrayFunction(new Date()).map((year) => year.toString().slice(0, 15));
    expect(yearArray).toStrictEqual([
      'Sat Jan 01 2022',
      'Fri Jan 01 2021',
      'Wed Jan 01 2020',
      'Tue Jan 01 2019',
      'Mon Jan 01 2018',
      'Sun Jan 01 2017',
    ]);
  });
});
