import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import DateTime, { DateTimeProps } from './DateTime';

describe('DateTime', () => {
  const testProps: DateTimeProps = {
    date: new Date('2021-09-06T00:00:00'),
    isExpiring: true,
  };

  it('renders', () => {
    renderWithTheme(<DateTime {...testProps} />);

    expect(screen.getByText(/06-Sep-2021/)).toBeInTheDocument();
    expect(screen.getByText(/0:00 AM/)).toBeInTheDocument();
  });
});
