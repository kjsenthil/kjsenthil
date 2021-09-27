import * as React from 'react';
import { screen, renderWithTheme } from '@tsw/test-util';
import DescriptiveToggleButton, { DescriptiveToggleButtonProps } from './DescriptiveToggleButton';

const descriptiveToggleButtonProps: DescriptiveToggleButtonProps = {
  value: 0,
  idNumber: 1,
  content: 'my content',
};

describe('DescriptiveToggleButton', () => {
  it('renders correctly', () => {
    renderWithTheme(<DescriptiveToggleButton {...descriptiveToggleButtonProps} />);

    expect(screen.getByText('1')).toBeVisible();
    expect(screen.getByText('my content')).toBeVisible();
  });
});
