import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import DropdownToggle from './DropdownToggle';

describe('Dropdown toggle', () => {
  const Dropdown = () => (
    <ul>
      <li>First</li>
      <li>Second</li>
    </ul>
  );

  beforeEach(() => {
    renderWithTheme(
      <DropdownToggle
        value="ISA"
        label="Mr J Doe"
        variant="h1"
        renderDropdown={<Dropdown />}
        dropdownToggled={false}
        setDropdownToggled={jest.fn()}
      />
    );
  });

  it('renders heading label', () => {
    expect(screen.getByText('MR J DOE')).toBeInTheDocument();
  });

  it('renders heading value', () => {
    expect(screen.getByText('ISA')).toBeInTheDocument();
  });

  it('renders the passed Dropdown component', () => {
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });
});
