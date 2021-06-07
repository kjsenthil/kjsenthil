import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import ComponentsWithCaption from './ComponentsWithCaption';

describe('ComponentsWithCaption', () => {
  it('renders with single component and caption', () => {
    renderWithTheme(
      <ComponentsWithCaption caption="Caption content">
        <div>Input text</div>
      </ComponentsWithCaption>
    );
    const captionText = screen.getByText('Caption content');
    const divContent = screen.getByText('Input text');

    expect(captionText).toBeVisible();
    expect(divContent).toBeVisible();
  });

  it('renders with multiple components and caption', () => {
    renderWithTheme(
      <ComponentsWithCaption caption="Caption content">
        <div>Input text 1</div>
        <div>Input text 2</div>
        <div>Input text 3</div>
      </ComponentsWithCaption>
    );
    const captionText = screen.getByText('Caption content');
    const divContent1 = screen.getByText('Input text 1');
    const divContent2 = screen.getByText('Input text 2');
    const divContent3 = screen.getByText('Input text 3');

    expect(captionText).toBeVisible();
    expect(divContent1).toBeVisible();
    expect(divContent2).toBeVisible();
    expect(divContent3).toBeVisible();
  });
});
