import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import ModalWithHeader from './ModalWithHeader';

describe('Modal', () => {
  test('Renders it successfully', () => {
    renderWithTheme(
      <ModalWithHeader variant="Confirmation" modalTitle="Test Title" open>
        Modal Content
      </ModalWithHeader>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByLabelText('close')).toBeInTheDocument();
  });

  test('Renders a variant without a close icon', () => {
    renderWithTheme(
      <ModalWithHeader variant="Confirmation" hideCloseButton modalTitle="Test Title" open>
        Modal Content
      </ModalWithHeader>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.queryByLabelText('close')).not.toBeInTheDocument();
  });
});
