import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import Banner from './Banner';

describe('Banner', () => {
  beforeEach(() => {
    renderWithTheme(
      <Banner
        icon="errorCircle"
        title="Title"
        paragraph="Test content"
        handleClick={() => jest.fn()}
        buttonLabel="Test button"
      />
    );
  });

  it('renders icon if passed', () => {
    expect(screen.getByText('errorCircle')).toBeInTheDocument();
  });

  it('renders title', () => {
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('renders paragraph', () => {
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders button label', () => {
    expect(screen.getByText('Test button')).toBeInTheDocument();
  });
});
