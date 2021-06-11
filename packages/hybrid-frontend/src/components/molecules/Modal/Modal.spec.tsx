import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import Modal from './Modal';

describe('Modal', () => {
  test('Renders it successfully', () => {
    renderWithTheme(
      <Modal modalTitle="Test Title" handleClose={() => {}} open>
        Modal Content
      </Modal>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });
});
