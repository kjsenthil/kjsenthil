import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import ProgressBar, { ProgressBarProps } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders with a single progress value', () => {
    const testProps: ProgressBarProps = {
      progress: 0.4,
    };
    renderWithTheme(<ProgressBar {...testProps} />);

    const progressBarWithValue = document.querySelector('[aria-valuenow="40"]');
    expect(progressBarWithValue).toBeInTheDocument();

    expect(screen.queryByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with multiple progress values', () => {
    const testProps: ProgressBarProps = {
      progress: [0.4, 0.3, 0.1],
    };
    renderWithTheme(<ProgressBar {...testProps} />);

    const progressBarWithValue = document.querySelector('[aria-valuenow="80"]');
    expect(progressBarWithValue).toBeInTheDocument();

    expect(screen.queryByRole('progressbar')).toBeInTheDocument();
  });
});
