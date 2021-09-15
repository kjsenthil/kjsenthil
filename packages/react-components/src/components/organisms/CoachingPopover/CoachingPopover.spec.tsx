import { renderWithTheme } from '@tsw/test-util';
import React from 'react';
import CoachingPopover from './CoachingPopover';

describe('CoachingPopover', () => {
  it('should call onButtonClick when button clicked', () => {
    const onButtonClick = jest.fn();
    const {
      result: { getByText },
    } = renderWithTheme(<CoachingPopover image={<p>Image</p>} onButtonClick={onButtonClick} />);

    const button = getByText('Book an appointment');
    button.click();

    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });
});
