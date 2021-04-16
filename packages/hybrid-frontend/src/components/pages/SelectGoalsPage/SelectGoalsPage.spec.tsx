import { renderWithTheme, screen } from '@tsw/test-util';
import React from 'react';
import SelectGoalsPage from './SelectGoalsPage';

describe('SelectGoalsPage', () => {
  beforeEach(() => {
    renderWithTheme(<SelectGoalsPage />);
  });

  test('SelectGoalsPage titles has been successfully rendered', () => {
    expect(screen.getByText('Select a goal')).toBeInTheDocument();
  });
});
