import React from 'react';
import * as Gatsby from 'gatsby';
import { renderWithTheme, screen } from '@tsw/test-util';
import HomeFeatureCards from './HomeFeatureCards';

const mockChildImageSharp = {
  childImageSharp: {
    fluid: {
      aspectRatio: 1.1,
      src: 'someImage.jpg',
      srcSet: '',
      sizes: '',
    },
  },
};

describe('HomeFeatureCards', () => {
  test('Renders the home feature cards', async () => {
    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
    useStaticQuery.mockImplementationOnce(() => ({
      thumbnail1: mockChildImageSharp,
      thumbnail2: mockChildImageSharp,
      thumbnail3: mockChildImageSharp,
    }));
    renderWithTheme(<HomeFeatureCards />);
    expect(await screen.findByTestId('home-feature-cards')).toBeInTheDocument();
    expect(await screen.findByAltText('Beach huts')).toBeInTheDocument();
    expect(await screen.findByAltText('Pineapple in a field')).toBeInTheDocument();
    expect(await screen.findByAltText('Donuts in a box')).toBeInTheDocument();
  });
});
