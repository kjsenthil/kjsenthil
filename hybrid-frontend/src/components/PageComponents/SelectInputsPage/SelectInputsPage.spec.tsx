import { render, screen } from '@testing-library/react';
import React from 'react';
import SelectInputsPage from './SelectInputsPage';

describe('SelectInputsPage', () => {
  beforeEach(() => {
    render(<SelectInputsPage />);
  });

  test('SelectInputsPage titles has been successfully rendered', () => {
    expect(screen.getByLabelText('Target Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('Target Year')).toBeInTheDocument();
    expect(screen.getByLabelText('Upfront Investment')).toBeInTheDocument();
    expect(screen.getByLabelText('Monthly Investment')).toBeInTheDocument();
    expect(screen.getByLabelText('Risk Appetite')).toBeInTheDocument();
  });
});
