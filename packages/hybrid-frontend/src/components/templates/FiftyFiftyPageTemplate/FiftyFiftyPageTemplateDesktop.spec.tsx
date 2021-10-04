import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import FiftyFiftyPageTemplate from './FiftyFiftyPageTemplate';

describe('50/50 Page Template desktop view', () => {
  test('Renders both the left and right sections', () => {
    const contentLeft = <p>The content to be displayed on the left</p>;
    const contentRight = <p>The content to be displayed on the right</p>;

    renderWithTheme(
      <FiftyFiftyPageTemplate contentLeft={contentLeft} contentRight={contentRight} />
    );

    expect(screen.getByText('The content to be displayed on the left')).toBeInTheDocument();
    expect(screen.getByText('The content to be displayed on the right')).toBeInTheDocument();
  });
});
