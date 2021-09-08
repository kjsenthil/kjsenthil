import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import BankDetailsSavedCard from './BankDetailsSavedCard';

describe('BankDetailsCard', () => {
  beforeEach(() => {
    renderWithTheme(
      <BankDetailsSavedCard
        accountNumberValue="xxxxxxx11"
        sortcodeValue="xx-xx-11"
        bankDetailsEditUrl="/bankdetailsedit"
      />
    );
  });

  test('The bank details saved card is visible and its components render correctly', () => {
    const testTexts = ['Acc No.', 'xxxxxxx11', 'Sort code', 'xx-xx-11', 'Edit'];

    testTexts.forEach((testText) => {
      expect(screen.getByText(testText)).toBeVisible();
    });
  });
});
