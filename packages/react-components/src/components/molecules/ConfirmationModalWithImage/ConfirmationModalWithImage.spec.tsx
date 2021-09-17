import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import ConfirmationModalWithImage, {
  ConfirmationModalWithImageProps,
} from './ConfirmationModalWithImage';

const closeFunction = jest.fn();

describe('ConfirmationModalWithImage', () => {
  const defaultConfirmationModalWithImageProps: ConfirmationModalWithImageProps = {
    modalTitle: "Sorry, that didn't work",
    description: 'Please check your payment details and try again',
    modalImageSrc: '/success.png',
    modalImageAlt: 'Successful transaction',
    modalBackGroundImageSrc: '/add-cash-bk.png',
    modalBackGroundColor: '#f8f8fe',
    open: true,
    onClose: closeFunction,
  };

  const expectedTexts = [
    "Sorry, that didn't work",
    'Please check your payment details and try again',
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('component renders with expected', () => {
    renderWithTheme(<ConfirmationModalWithImage {...defaultConfirmationModalWithImageProps} />);

    expectedTexts.forEach((expectedString) =>
      expect(screen.getByText(expectedString, { exact: false })).toBeVisible()
    );
    expect(screen.getByAltText('Successful transaction')).toBeInTheDocument();
  });

  it('modal is closed when the close icon button clicked', () => {
    renderWithTheme(<ConfirmationModalWithImage {...defaultConfirmationModalWithImageProps} />);

    const crossButton = screen.getByTestId('cross-close-button');
    expect(crossButton).toBeVisible();

    crossButton.click();

    expect(closeFunction).toHaveBeenCalledTimes(1);
  });

  it('modal is closed when the close button clicked', () => {
    renderWithTheme(<ConfirmationModalWithImage {...defaultConfirmationModalWithImageProps} />);

    const closeButton = screen.getByText('Close');
    expect(closeButton).toBeVisible();

    closeButton.click();

    expect(closeFunction).toHaveBeenCalledTimes(1);
  });
});
