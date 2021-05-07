import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import * as Gatsby from 'gatsby';
import OnBoardLayout from './OnBoardLayout';

const mockImageSharp = {
  childImageSharp: {
    fluid: {
      aspectRatio: 1.1,
      src: 'someImage.jpg',
      srcSet: '',
      sizes: '',
    },
  },
};

describe('OnBoardLayout', () => {
  test('Renders with child elements', async () => {
    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
    useStaticQuery.mockImplementationOnce(() => ({
      thumbnail1: mockImageSharp,
    }));
    renderWithTheme(
      <OnBoardLayout
        titleText="Title Text"
        titleSubText="Sub Title Text"
        onSubmitHandler={() => {}}
        disableCondition={false}
      >
        <div data-testid="some-child-element" />
      </OnBoardLayout>
    );
    expect(await screen.findByTestId('some-child-element')).toBeInTheDocument();
  });
});
