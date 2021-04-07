/* eslint-disable implicit-arrow-linebreak */
import React from 'react';

import { render, screen } from '@testing-library/react';

const mockProjectResponse = {
  contributions: 74000.0,
  projections: [
    { year: 0, low: 2000.0, medium: 2000.0, high: 2000.0, actual: 2000.0 },
    {
      year: 1,
      low: 4106,
      medium: 4475.2,
      high: 4828,
      actual: 4400.0,
    },
  ],
};

jest.mock('../../../api/getProjection');

describe('SimulationPage', () => {
  test('SimulationPage titles has been successfully rendered', async () => {
    const mockGetProjections = jest.fn().mockResolvedValueOnce(mockProjectResponse);

    jest.doMock('../../../api/getProjection', () => ({
      getProjections: mockGetProjections,
    }));

    // Needed to ensure the function under /endpoint.ts gets loaded first before import
    const SimulationPage = (await import('./SimulationPage')).default;
    render(<SimulationPage />);

    expect(screen.getByText('Simulation Page')).toBeInTheDocument();
  });
});
