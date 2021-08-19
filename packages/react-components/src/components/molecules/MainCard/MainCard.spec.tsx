import React from 'react';
import { renderWithTheme } from '@tsw/test-util';
import MainCard from './MainCard';
import { Button, Typography, useMediaQuery } from '../../atoms';
import { MainCardProps } from './index';

jest.mock('../../atoms', () => {
  const originalModule = jest.requireActual('../../atoms');

  return {
    ...originalModule,
    useMediaQuery: jest.fn(),
  };
});

const props: Omit<MainCardProps, 'children'> = {
  isLoading: false,
  renderActionEl: () => <Button>Test Button</Button>,
  title: 'Title Text',
  respondTo: 'sm',
};

describe('MainCard', () => {
  beforeEach(() => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);
  });
  describe('when children is an element', () => {
    const element = (mainCardProps: Omit<MainCardProps, 'children'>) => (
      <MainCard {...mainCardProps}>
        <Typography>Test Content</Typography>
      </MainCard>
    );

    it('renders a MainCard', () => {
      const { result } = renderWithTheme(element(props));

      const titleText = result.getByText('Title Text');
      const buttonText = result.getByText('Test Button');
      const contentText = result.getByText('Test Content');

      expect(titleText).toBeVisible();
      expect(buttonText).toBeVisible();
      expect(contentText).toBeVisible();
    });

    it('does not render the card content when loading', () => {
      props.isLoading = true;
      const { result } = renderWithTheme(element(props));

      expect(result.queryByText('Test Button')).not.toBeInTheDocument();
      expect(result.queryByText('Test Content')).not.toBeInTheDocument();
    });
  });

  describe.only('when children is function', () => {
    const children = (isMobile: boolean) => <Typography>{isMobile && 'For Mobile'}</Typography>;

    const element = (mainCardProps: Omit<MainCardProps, 'children'>) => (
      <MainCard {...mainCardProps}>{children}</MainCard>
    );

    it('renders a MainCard', () => {
      props.isLoading = false;
      const { result } = renderWithTheme(element(props));

      const titleText = result.getByText('Title Text');
      const buttonText = result.getByText('Test Button');
      const contentText = result.getByText('For Mobile');

      expect(titleText).toBeVisible();
      expect(buttonText).toBeVisible();
      expect(contentText).toBeVisible();
    });

    it('does not render the card content when loading', () => {
      props.isLoading = true;
      const { result } = renderWithTheme(element(props));

      expect(result.queryByText('Test Button')).not.toBeInTheDocument();
      expect(result.queryByText('For Mobile')).not.toBeInTheDocument();
    });
  });
});
