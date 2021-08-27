import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import IsaAllowance, { IsaAllowanceProps } from './IsaAllowance';

jest.mock('../../atoms/Tooltip', () => ({
  __esModule: true,
  default: ({ children, title }) => (
    <>
      <div>{title}</div>
      <div>{children}</div>
    </>
  ),
}));

describe('IsaAllowance', () => {
  const defaultIsaAllowanceProps: IsaAllowanceProps = {
    contributions: 100,
    totalAllowance: 1000,
    title: 'ISA ALLOWANCE',
  };

  test('component renders with expected goal data', () => {
    renderWithTheme(<IsaAllowance {...defaultIsaAllowanceProps} />);
    const expectedTexts = ['£100', '£1,000', 'ISA ALLOWANCE'];
    expectedTexts.forEach((expectedString) =>
      expect(screen.getByText(expectedString, { exact: false })).toBeVisible()
    );
  });
});
