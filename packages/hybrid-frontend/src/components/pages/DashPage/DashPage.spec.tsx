import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import { mockClient, mockRefresh } from '../../../../__mocks__/jestMock';

describe('DashPage', () => {
  test('DashPage title has been successfully rendered', async () => {
    jest.doMock('../../../api/getMyAcnClient', () => ({
      getMyAcnClient: mockClient,
    }));

    jest.doMock('../../../api/postRefreshToken', () => ({
      postRefreshToken: mockRefresh,
    }));

    const DashPage = (await import('./DashPage')).default;
    renderWithTheme(<DashPage />);
    expect(screen.getByText('DashBoard Page')).toBeInTheDocument();
  });
});
