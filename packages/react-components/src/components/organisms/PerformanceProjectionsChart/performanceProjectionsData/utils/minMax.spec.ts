import {
  getPerformanceProjectionsDataMaxValue,
  getPerformanceProjectionsDataMinValue,
  GetPerformanceProjectionsDataMinMaxValueProps,
} from './minMax';
import {
  ProjectionsChartProjectionDatum,
  ProjectionsChartProjectionTargetDatum,
} from '../../../../../services/projections';
import { ProjectionsChartHistoricalDatum } from '../../../../../services/performance';

const mockProjectionsDataA: ProjectionsChartProjectionDatum[] = [
  {
    netContributionsToDate: 10000,
    upperBound: 20000,
    lowerBound: 5000,
    value: 12000,
    date: new Date(2020, 0, 1),
  },
  {
    netContributionsToDate: 11000,
    upperBound: 21000,
    lowerBound: 6000,
    value: 13000,
    date: new Date(2021, 0, 2),
  },
];

const mockProjectionsDataB: ProjectionsChartProjectionDatum[] = [
  {
    netContributionsToDate: 1000,
    upperBound: 9250,
    lowerBound: 250,
    value: 8500,
    date: new Date(2020, 0, 1),
  },
  {
    netContributionsToDate: 5000,
    upperBound: 4000,
    lowerBound: 9000,
    value: 7500,
    date: new Date(2021, 0, 2),
  },
];

const mockProjectionTargetDataA: ProjectionsChartProjectionTargetDatum[] = [
  {
    value: 22000,
    date: new Date(2020, 0, 1),
  },
  {
    value: 23000,
    date: new Date(2020, 0, 2),
  },
];

const mockProjectionTargetDataB: ProjectionsChartProjectionTargetDatum[] = [
  {
    value: 9500,
    date: new Date(2020, 0, 1),
  },
  {
    value: 10500,
    date: new Date(2020, 0, 2),
  },
];

const mockHistoricalDataA: ProjectionsChartHistoricalDatum[] = [
  { value: 10000, netContributionsToDate: 5000, date: new Date(2019, 0, 1) },
  { value: 20000, netContributionsToDate: 4500, date: new Date(2019, 0, 2) },
];

const mockHistoricalDataB: ProjectionsChartHistoricalDatum[] = [
  { value: 450, netContributionsToDate: 300, date: new Date(2019, 0, 1) },
  { value: 850, netContributionsToDate: 600, date: new Date(2019, 0, 2) },
];

type TestCase = [
  // props to be passed to the getPerformanceProjectionsDataMaxValue function
  GetPerformanceProjectionsDataMinMaxValueProps,

  number // expected result
];

describe('getPerformanceProjectionsDataMinValue', () => {
  describe('the upper bound and lower bound of projection values are considered', () => {
    const testCases: TestCase[] = [
      [
        {
          projectionsData: mockProjectionsDataA,
          projectionsTargetData: mockProjectionTargetDataA,
          historicalData: mockHistoricalDataA,
        },
        4500, // In mockHistoricalDataA
      ],
      [
        {
          projectionsData: mockProjectionsDataB,
          historicalData: mockHistoricalDataA,
        },
        250, // In mockProjectionsDataB
      ],
      [
        {
          projectionsData: mockProjectionsDataA,
          projectionsTargetData: mockProjectionTargetDataB,
          historicalData: mockHistoricalDataB,
        },
        300, // In mockHistoricalDataB
      ],
    ];

    test.each(testCases)('it returns the correct min value for test case %#', (props, expected) => {
      expect(getPerformanceProjectionsDataMinValue(props)).toBe(expected);
    });
  });

  describe('the upper bound and lower bound of projection values are not considered', () => {
    const testCases: TestCase[] = [
      [
        {
          projectionsData: mockProjectionsDataA,
          projectionsTargetData: mockProjectionTargetDataA,
          historicalData: mockHistoricalDataA,
        },
        4500, // In mockHistoricalDataA
      ],
      [
        {
          projectionsData: mockProjectionsDataB,
          historicalData: mockHistoricalDataA,
        },
        1000, // In mockProjectionsDataB
      ],
      [
        {
          projectionsData: mockProjectionsDataA,
          projectionsTargetData: mockProjectionTargetDataB,
          historicalData: mockHistoricalDataB,
        },
        300, // In mockHistoricalDataB
      ],
    ];

    test.each(testCases)('it returns the correct min value for test case %#', (props, expected) => {
      expect(getPerformanceProjectionsDataMinValue({ ...props, noValueRange: true })).toBe(
        expected
      );
    });
  });
});

describe('getPerformanceProjectionsDataMaxValue', () => {
  describe('the upper bound and lower bound of projection values are considered', () => {
    const testCases: TestCase[] = [
      [
        {
          projectionsData: mockProjectionsDataA,
          projectionsTargetData: mockProjectionTargetDataA,
          historicalData: mockHistoricalDataA,
        },
        23000, // In mockProjectionTargetDataA
      ],
      [
        {
          projectionsData: mockProjectionsDataB,
          historicalData: mockHistoricalDataA,
        },
        20000, // In mockHistoricalDataA
      ],
      [
        {
          projectionsData: mockProjectionsDataA,
          projectionsTargetData: mockProjectionTargetDataB,
          historicalData: mockHistoricalDataB,
        },
        21000, // In mockProjectionsDataA
      ],
    ];

    test.each(testCases)('it returns the correct max value for test case %#', (props, expected) => {
      expect(getPerformanceProjectionsDataMaxValue(props)).toBe(expected);
    });
  });

  describe('the upper bound and lower bound of projection values are not considered', () => {
    const testCases: TestCase[] = [
      [
        {
          projectionsData: mockProjectionsDataA,
          projectionsTargetData: mockProjectionTargetDataA,
          historicalData: mockHistoricalDataA,
        },
        23000, // In mockProjectionTargetDataA
      ],
      [
        {
          projectionsData: mockProjectionsDataB,
          historicalData: mockHistoricalDataA,
        },
        20000, // In mockHistoricalDataA
      ],
      [
        {
          projectionsData: mockProjectionsDataA,
          projectionsTargetData: mockProjectionTargetDataB,
          historicalData: mockHistoricalDataB,
        },
        13000, // mockProjectionsDataA
      ],
    ];

    test.each(testCases)('it returns the correct max value for test case %#', (props, expected) => {
      expect(getPerformanceProjectionsDataMaxValue({ ...props, noValueRange: true })).toBe(
        expected
      );
    });
  });
});
