import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import ExpandableBulletList, { ExpandableBulletListProps } from './ExpandableBulletList';

describe('ExpandableBulletList', () => {
  const defaultProps: ExpandableBulletListProps = {
    bulletList: ['First item', 'Second item'],
    title: 'Some title',
  };

  it('renders with the list closed by default', () => {
    renderWithTheme(<ExpandableBulletList {...defaultProps} />);
    expect(screen.getByText('More about Some title')).toBeVisible();
    expect(screen.getByText('First item')).not.toBeVisible();
  });

  it('expands the list of items when the button is clicked', () => {
    renderWithTheme(<ExpandableBulletList {...defaultProps} />);
    screen.getByRole('button').click();
    expect(screen.getByText('Less about Some title')).toBeVisible();
    expect(screen.getByText('First item')).toBeVisible();
    expect(screen.getByText('Second item')).toBeVisible();
  });

  it('renders with the list open by default if the expanded boolean is set', () => {
    renderWithTheme(<ExpandableBulletList {...defaultProps} expanded />);
    expect(screen.getByText('Less about Some title')).toBeVisible();
    expect(screen.getByText('First item')).toBeVisible();
    expect(screen.getByText('Second item')).toBeVisible();
  });
});
