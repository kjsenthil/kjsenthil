import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import SplashHeader from './SplashHeader';

describe('SplashHeader', () => {
  describe('component render', () => {
    beforeEach(() => {
      const onButtonClick = jest.fn();
      renderWithTheme(
        <SplashHeader
          title="Text"
          bodyText="test text"
          buttonText="test link text"
          iconName="support"
          onButtonClick={onButtonClick}
          imageAlt="test alt text"
          imageSrc="/coach-splash-header.png"
        />
      );
    });

    it('renders a SplashHeader', () => {
      expect(screen.getByText('Text')).toBeInTheDocument();
      expect(screen.getByText('test text')).toBeInTheDocument();
      expect(screen.getByText('test link text')).toBeInTheDocument();
      expect(screen.getByAltText(/test alt text/i)).toBeInTheDocument();
    });

    it('renders an icon if iconName given', () => {
      expect(screen.getByText('support')).toBeInTheDocument();
    });
  });

  it('calls handleClick on button press', () => {
    const onButtonClick = jest.fn();
    renderWithTheme(
      <SplashHeader
        title="Text"
        bodyText="test text"
        buttonText="test link text"
        iconName="support"
        onButtonClick={onButtonClick}
        imageAlt="test alt text"
        imageSrc="/coach-splash-header.png"
      />
    );

    const button = screen.getByText('test link text');

    button.click();

    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });
});
