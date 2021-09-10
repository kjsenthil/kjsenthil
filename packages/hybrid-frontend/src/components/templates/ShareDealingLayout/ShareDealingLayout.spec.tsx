import React from 'react';
import { renderWithTheme, screen, fireEvent } from '@tsw/test-util';
import ShareDealingLayout from './ShareDealingLayout';

const onClose = jest.fn();
const onPrimaryAtionClick = jest.fn();
const onSecondaryActionClick = jest.fn();

const props = {
  open: true,
  titleText: 'Title Text',
  titleSubText: 'Sub Title Text',
  onClose,
  onPrimaryAtionClick,
  onSecondaryActionClick,
  primaryActionText: 'Continue',
  secondaryActionText: 'Cancel',
};

describe('ShareDealingLayout', () => {
  beforeEach(() => {
    renderWithTheme(
      <ShareDealingLayout {...props}>
        <div data-testid="children" />
      </ShareDealingLayout>
    );
  });

  it('renders title, subtitle and children', async () => {
    expect(await screen.findByText(props.titleText)).toBeInTheDocument();
    expect(await screen.findByText(props.titleSubText.toUpperCase())).toBeInTheDocument();
    expect(await screen.findByTestId('children')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const close = screen.getByTestId('close-share-dealing');
    fireEvent.click(close);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onPrimaryActionClick when primary button is clicked', () => {
    const primary = screen.getByTestId('share-dealing-primary-action');
    fireEvent.click(primary);

    expect(onPrimaryAtionClick).toHaveBeenCalledTimes(1);
  });

  it('calls onSecondaryActionClick when secondary button is clicked', () => {
    const secondary = screen.getByTestId('share-dealing-secondary-action');
    fireEvent.click(secondary);

    expect(onSecondaryActionClick).toHaveBeenCalledTimes(1);
  });
});
