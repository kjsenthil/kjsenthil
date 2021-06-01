import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import useChartStyles from './useChartStyles';

describe('useChartStyles', () => {
  const TestComponent = () => {
    useChartStyles();

    return <div>Test component</div>;
  };

  test('The hook returns without error and the test component renders without error', () => {
    renderWithTheme(<TestComponent />);

    expect(screen.getByText('Test component')).toBeVisible();
  });
});
