import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import Switcher from './Switcher';

describe('Switcher', () => {
  test('handles onClick and toggles checkbox', () => {
    const onClick = jest.fn();
    renderWithTheme(<Switcher name="Switch" checked onClick={onClick} />);
    const Switch = document.getElementsByName('Switch')[0] as HTMLInputElement;
    const checkbox = screen.getByRole('checkbox');
    expect(Switch?.checked).toBe(true);
    checkbox.click();
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(Switch?.checked).toBe(false);
    checkbox.click();
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(Switch?.checked).toBe(true);
  });
});
