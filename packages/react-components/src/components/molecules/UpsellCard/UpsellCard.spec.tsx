import React from 'react';
import { renderWithTheme } from '@tsw/test-util';
import UpsellCard from './UpsellCard';
import { Button, Typography, useMediaQuery } from '../../atoms';
import { UpsellCardProps } from '.';

jest.mock('../../atoms', () => {
  const originalModule = jest.requireActual('../../atoms');

  return {
    ...originalModule,
    useMediaQuery: jest.fn(),
  };
});

const props: Omit<UpsellCardProps, 'children'> = {
  isLoading: false,
  renderActionEl: () => <Button>Test Button</Button>,
  title: 'Title Text',
  respondTo: 'sm',
};

describe('UpsellCard', () => {
  beforeEach(() => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);
  });
  describe('when children is an element', () => {
    const element = (upsellCardProps: Omit<UpsellCardProps, 'children'>) => (
      <UpsellCard {...upsellCardProps}>
        <Typography>Test Content</Typography>
      </UpsellCard>
    );

    it('renders a UpsellCard', () => {
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
});
