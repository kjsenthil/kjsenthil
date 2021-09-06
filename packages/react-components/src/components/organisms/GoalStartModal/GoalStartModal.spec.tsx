import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import GoalStartModal from './GoalStartModal';

describe('GoalStartModal', () => {
  test('Renders it successfully', () => {
    renderWithTheme(<GoalStartModal open onClose={() => null} />);
    expect(screen.getByText(`If you're happy with this, let's get started...`)).toBeInTheDocument();
  });
});
