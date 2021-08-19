import React from 'react';
import { renderWithTheme } from '@tsw/test-util';
import Checkbox from '.';

describe('Checkbox', () => {
  let checkboxElement: HTMLInputElement;

  beforeEach(() => {
    renderWithTheme(<Checkbox name="unchecked" />);
    checkboxElement = document.getElementsByName('unchecked')[0] as HTMLInputElement;
  });

  test('marks checkbox as unchecked by default', () => {
    expect(checkboxElement?.checked).toBe(false);
  });

  test('marks the checkbox as checked', () => {
    checkboxElement?.click();
    expect(checkboxElement?.checked).toBe(true);
  });
});
