import React from 'react';
import { renderWithTheme, screen, fireEvent } from '@tsw/test-util';
import { navigate } from 'gatsby';
import NavLinkWithDropDown from './NavLinkWithDropDown';

jest.mock('gatsby', () => ({
  ...jest.requireActual('gatsby'),
  navigate: jest.fn(),
}));

describe('Nav Link with drop down', () => {
  const name = 'Dropdown';
  const path = '/test';
  const childLinks = [
    {
      name: 'first dropdown',
      path: '/first-dropdown',
      type: 'link',
    },
    {
      name: 'second dropdown',
      path: '/second-dropdown',
      type: 'link',
    },
  ];

  beforeEach(() => {
    renderWithTheme(
      <NavLinkWithDropDown
        name={name}
        path={path}
        navigate={navigate}
        childLinks={childLinks}
        type="link"
      />
    );
  });

  it('renders a navlink with dropdown menu', () => {
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByLabelText('open Dropdown menu'));
  });

  it('renders the dropdown links', () => {
    fireEvent.click(screen.getByLabelText('open Dropdown menu'));

    expect(screen.queryByText(childLinks[0].name)).toBeInTheDocument();
    expect(screen.queryByText(childLinks[1].name)).toBeInTheDocument();
  });
});
