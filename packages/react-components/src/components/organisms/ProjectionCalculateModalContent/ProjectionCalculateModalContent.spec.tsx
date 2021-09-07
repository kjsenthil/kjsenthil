import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import ProjectionCalculateModal from './ProjectionCalculateModalContent';

describe('ProjectionCalculateModal', () => {
  test('Renders it successfully', () => {
    renderWithTheme(<ProjectionCalculateModal />);
    expect(screen.getByText(`How was this projection calculated?`)).toBeInTheDocument();
  });
});
