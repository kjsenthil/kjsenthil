import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PillWithDropdown, { PillWithDropdownProps } from './PillWithDropdown';

jest.mock('../../atoms/Icon', () => ({
  __esModule: true,
  default: ({ name }) => <div>{name}</div>,
}));

describe('PillWithDropdown', () => {
  const handleClick = () => {};

  const pillProps: PillWithDropdownProps = {
    pillLabel: "Partner's Retirement",
    pillOnClickHandler: handleClick,
    menuItems: [
      {
        label: 'First item',
        typographyProps: {
          variant: 'sh3',
          color: 'primary',
          colorShade: 'dark2',
        },
        iconProps: { name: 'edit', color: 'primary' },
        menuItemOnClickHandler: handleClick,
      },
      {
        label: 'Second item',
        typographyProps: { variant: 'sh3', color: 'error' },
        iconProps: { name: 'delete', color: 'error' },
        menuItemOnClickHandler: handleClick,
      },
    ],
  };

  beforeEach(() => {
    renderWithTheme(<PillWithDropdown {...pillProps} />);
  });

  it('renders a pill with a dropdown menu', () => {
    expect(screen.getByText(pillProps.pillLabel)).toBeInTheDocument();
  });

  it('renders the passed dropdown items', () => {
    expect(screen.getByText('First item')).toBeInTheDocument();
    expect(screen.getByText('Second item')).toBeInTheDocument();
  });
});
