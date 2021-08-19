import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import ButtonWithDropdown from './ButtonWithDropdown';

describe('button', () => {
  const Dropdown = () => (
    <ul>
      <li>First item</li>
      <li>Second item</li>
    </ul>
  );

  const label = 'Dropdown';

  beforeEach(() => {
    renderWithTheme(<ButtonWithDropdown label={label} renderDropdown={<Dropdown />} />);
  });

  it('renders a button with dropdown menu', () => {
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('renders the passed Dropdown component', () => {
    expect(screen.getByText('First item')).toBeInTheDocument();
    expect(screen.getByText('Second item')).toBeInTheDocument();
  });
});
