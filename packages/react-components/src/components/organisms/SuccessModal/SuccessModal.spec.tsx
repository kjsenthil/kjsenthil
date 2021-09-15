import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import SuccessModal, { SuccessModalProps } from './SuccessModal';

describe('SuccessModal', () => {
  const defaultSuccessModalProps: SuccessModalProps = {
    title: 'Success!',
    accountName: 'ISA',
    amount: 100,
    isOpen: true,
    imgSrc: '/someImage.png',
    imgAlt: 'some alt text',
  };

  test('component renders with expected goal data', () => {
    renderWithTheme(<SuccessModal {...defaultSuccessModalProps} />);
    const expectedTexts = ['Success!', 'ISA', '100'];
    expectedTexts.forEach((expectedString) =>
      expect(screen.getByText(expectedString, { exact: false })).toBeVisible()
    );
    expect(screen.getByAltText('some alt text')).toBeInTheDocument();
  });
});
