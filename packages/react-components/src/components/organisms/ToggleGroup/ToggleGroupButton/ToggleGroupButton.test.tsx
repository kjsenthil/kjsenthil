import * as React from 'react';
import { screen, renderWithTheme } from '@tsw/test-util';
import ToggleGroupButton, { ToggleGroupButtonProps } from './ToggleGroupButton';

const descriptiveToggleButtonProps: ToggleGroupButtonProps = {
  value: 0,
  idNumber: 1,
  content: 'my content',
};

describe('ToggleGroupButton', () => {
  it('renders correctly', () => {
    renderWithTheme(<ToggleGroupButton {...descriptiveToggleButtonProps} />);

    expect(screen.getByText('1')).toBeVisible();
    expect(screen.getByText('my content')).toBeVisible();
  });
});
