import { render, screen } from '@testing-library/react';
import React from 'react';
import SelectGoalsPage from './SelectGoalsPage';

describe('SelectGoalsPage', () => {
  beforeEach(() => {
    render(<SelectGoalsPage />);
  });

  test('SelectGoalsPage titles has been successfully rendered', () => {
    expect(screen.getByText('Select a Goal')).toBeInTheDocument();
  });
});
