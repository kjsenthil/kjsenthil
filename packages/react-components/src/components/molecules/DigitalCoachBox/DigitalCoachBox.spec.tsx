import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import DigitalCoachBox, { DigitalCoachBoxProps } from './DigitalCoachBox';

jest.mock('../../molecules/TypographyWithTooltip', () => ({
  __esModule: true,
  default: ({ children }) => <div role="tooltip">{children}</div>,
}));

describe('DigitalCoachBox', () => {
  const testProps: DigitalCoachBoxProps = {
    title: 'Some title',
    description: 'Some description',
  };

  it('renders without tooltip', () => {
    renderWithTheme(<DigitalCoachBox {...testProps} />);

    expect(screen.getByText(testProps.title)).toBeVisible();
    expect(screen.getByText(testProps.description as string)).toBeVisible();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('renders with tooltip', () => {
    const testPropsWithTooltip = {
      ...testProps,
      tooltip: 'Some tooltip',
    };

    renderWithTheme(<DigitalCoachBox {...testPropsWithTooltip} />);

    expect(screen.getByText(testPropsWithTooltip.title)).toBeVisible();
    expect(screen.getByText(testPropsWithTooltip.description as string)).toBeVisible();
    expect(screen.queryByRole('tooltip')).toBeInTheDocument();
  });
});
