import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import DirectDebitGuarantee from './DirectDebitGuarantee';

describe('DirectDebitGuarantee', () => {
  it('renders', () => {
    renderWithTheme(<DirectDebitGuarantee />);
    expect(screen.getByText('Protected by the Direct Debit Guarantee')).toBeVisible();
    expect(screen.getByText('Direct Debit Guarantee')).not.toBeVisible();
  });
});
