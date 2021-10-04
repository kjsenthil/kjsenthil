import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import FiftyFiftyPageTemplate from './FiftyFiftyPageTemplate';

jest.mock('@material-ui/core', () => ({
  ...jest.requireActual('@material-ui/core'),
  useMediaQuery: () => 'sm',
}));

describe('50/50 Page Template mobile view', () => {
  test('Only renders the left section', () => {
    const contentLeft = <p>The content to be displayed on the left</p>;
    const contentRight = <p>The content to be displayed on the right</p>;

    renderWithTheme(
      <FiftyFiftyPageTemplate contentLeft={contentLeft} contentRight={contentRight} />
    );

    expect(screen.getByText('The content to be displayed on the left')).toBeInTheDocument();
    expect(screen.queryByText('The content to be displayed on the right')).not.toBeInTheDocument();
  });
});
