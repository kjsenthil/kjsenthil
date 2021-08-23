import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import AccountFilter from './AccountFilter';

describe('AccountFilter', () => {
  beforeEach(() => {
    renderWithTheme(<AccountFilter />);
  });

  test('Account Filter is visible and its components render correctly', () => {
    const testTexts = ['All accounts', 'My accounts', 'Linked accounts', 'Create Portfolio'];

    testTexts.forEach((testText) => {
      expect(screen.getByText(testText)).toBeVisible();
    });
  });
});
