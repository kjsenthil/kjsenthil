/* eslint-disable import/prefer-default-export */
import { ProjectionResponse } from '../types';

export const mockProjectionResponse: ProjectionResponse = {
  contributions: 74000.0,
  projections: [
    { year: 0, low: 2000.0, medium: 2000.0, high: 2000.0, actual: 2000.0 },
    { year: 1, low: 4099.872949574888, medium: 4468.0, high: 4819.92012729036, actual: 4400.0 },
    {
      year: 2,
      low: 6176.1690105491589880761165105,
      medium: 7019.912,
      high: 7791.3037220995442103325157998,
      actual: 6800.0,
    },
    {
      year: 3,
      low: 8234.216737667016817101837966,
      medium: 9658.589008,
      high: 10930.166047517421815041854989,
      actual: 9200.0,
    },
    {
      year: 4,
      low: 10296.841095398955887566732078,
      medium: 12386.981034272,
      high: 14223.210672545497854737034604,
      actual: 11600.0,
    },
    {
      year: 5,
      low: 12381.155383090810302097648194,
      medium: 15208.138389436957647058823529,
      high: 17662.661884453163813881737249,
      actual: 14000.0,
    },
    {
      year: 6,
      low: 14501.061059763807867433559124,
      medium: 18125.215094678229411764705882,
      high: 21243.860848576236670426424309,
      actual: 16400.0,
    },
  ],
};
