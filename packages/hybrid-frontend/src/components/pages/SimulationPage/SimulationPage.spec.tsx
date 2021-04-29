/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import { renderWithTheme, screen, waitFor } from '@tsw/test-util';
import userEvent from '@testing-library/user-event';
import getProjections from '../../../api/getProjection';
import SimulationPage from './SimulationPage';

jest.mock('../../../api/getProjection');
jest.mock('../../organisms/ProjectionsChart', () => ({
  __esModule: true,
  default: () => <div>Projection Chart</div>,
}));
jest.mock('../../organisms/ProjectionsGrid', () => ({
  __esModule: true,
  default: () => <div>Projection Grid</div>,
}));

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
    (getProjections as jest.Mock).mockResolvedValue(mockProjectResponse);

    renderWithTheme(<SimulationPage />);

    const submit = screen.getByText('Update');

    const projectionGrid = 'Projection Grid';
    const projectionChart = 'Projection Chart';

    userEvent.click(submit);

    expect(screen.queryByText(projectionGrid)).not.toBeInTheDocument();
    expect(screen.queryByText(projectionChart)).not.toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('Simulation Page')).toBeInTheDocument());
    expect(screen.queryByText(projectionGrid)).toBeInTheDocument();
    expect(screen.queryByText(projectionChart)).toBeInTheDocument();
  });
});
