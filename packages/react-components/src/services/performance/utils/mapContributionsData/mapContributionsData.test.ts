import mapContributionsData from './mapContributionsData';

describe('mapContributionsData', () => {
  it('maps value with Date type', () => {
    expect(
      mapContributionsData({
        netContributionsToDate: 1000,
        date: '2016-05-13T00:00:00',
      })
    ).toStrictEqual({
      value: 1000,
      date: new Date('2016-05-13T00:00:00Z'),
    });
  });
});
