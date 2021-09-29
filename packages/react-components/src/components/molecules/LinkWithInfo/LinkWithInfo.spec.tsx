import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import { Typography } from '@material-ui/core';
import LinkWithInfo, { LinkWithInfoProps } from './LinkWithInfo';

describe('LinkWithInfo', () => {
  const defaultProps: LinkWithInfoProps = {
    linkText: 'Title',
    renderInfo: <Typography>Header</Typography>,
  };

  it('renders with the list closed by default', () => {
    renderWithTheme(<LinkWithInfo {...defaultProps} />);
    expect(screen.getByText('Title')).toBeVisible();
    expect(screen.getByText('Header')).not.toBeVisible();
  });

  it('expands the list of items when the button is clicked', () => {
    renderWithTheme(<LinkWithInfo {...defaultProps} />);
    screen.getByRole('button').click();
    expect(screen.getByText('Header')).toBeVisible();
  });
});
