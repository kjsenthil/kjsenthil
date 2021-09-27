import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import FiftyFiftyPageTemplate from './FiftyFiftyPageTemplate';

describe('50/50 Page Template desktop view', () => {
  test('Renders both the left and right sections', () => {
    const contentLeft = {
      children: <p>The content to be displayed on the left</p>,
      backgroundColour: 'white',
    };

    const contentRight = {
      children: <p>The content to be displayed on the right</p>,
      backgroundColour: 'black',
    };

    renderWithTheme(
      <FiftyFiftyPageTemplate contentLeft={contentLeft} contentRight={contentRight} />
    );

    expect(screen.getByText('The content to be displayed on the left')).toBeInTheDocument();
    expect(screen.getByText('The content to be displayed on the right')).toBeInTheDocument();
  });
});
