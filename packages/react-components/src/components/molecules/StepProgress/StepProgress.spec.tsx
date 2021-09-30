import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';

import StepProress, { StepProgressProps } from './StepProgress';

describe('StepProress', () => {
  const props: StepProgressProps = {
    currentStep: 1,
    progress: 1,
    stepNames: ['Profile', 'Verification', 'Account'],
  };

  it('renders 3 step progress bars', () => {
    renderWithTheme(<StepProress {...props} />);

    expect(screen.getByTestId('step-Profile')).toBeInTheDocument();
    expect(screen.getByTestId('step-Verification')).toBeInTheDocument();
    expect(screen.getByTestId('step-Account')).toBeInTheDocument();
  });

  it('displays first step', () => {
    renderWithTheme(<StepProress {...props} />);

    expect(screen.getByText('1 of 3')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('displays second step', () => {
    renderWithTheme(<StepProress {...props} currentStep={2} />);

    expect(screen.getByText('2 of 3')).toBeInTheDocument();
    expect(screen.getByText('Verification')).toBeInTheDocument();
  });

  it('displays third step', () => {
    renderWithTheme(<StepProress {...props} currentStep={3} />);

    expect(screen.getByText('3 of 3')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
  });
});
