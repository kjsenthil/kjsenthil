import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import ModalWithHeader from './ModalWithHeader';

describe('Modal', () => {
  test('Renders it successfully', () => {
    renderWithTheme(
      <ModalWithHeader variant="DefaultTitle" modalTitle="Test Title" open>
        Modal Content
      </ModalWithHeader>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });
});
