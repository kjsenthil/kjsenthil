import React from 'react';
import { renderWithTheme } from '@tsw/test-util';
import { Button, Typography } from '../../atoms';
import SignpostModal, { SignpostModalProps } from './SignpostModal';

const baseProps: SignpostModalProps = {
  title: 'Title',
  content: <Typography>Content</Typography>,
  button: <Button>Button</Button>,
};
const imageElement = <img alt="Portrait of coach" />;

const renderElement = (extraProps?: Partial<SignpostModalProps>) => {
  const allProps = { ...baseProps, ...extraProps };
  const { result } = renderWithTheme(<SignpostModal {...allProps} />);
  return {
    title: result.getByText('Title'),
    content: result.getByText('Content'),
    button: result.getByText('Button'),
    image: result.queryByAltText('Portrait of coach'),
  };
};

describe('SignpostModal', () => {
  describe('when image is omitted', () => {
    it('renders a SignpostModal with no image', () => {
      const { title, content, button, image } = renderElement();

      expect(title).toBeVisible();
      expect(content).toBeVisible();
      expect(button).toBeVisible();
      expect(image).toBeNull();
    });
  });

  describe('when image is provided', () => {
    it('renders a SignpostModal with an image', () => {
      const { title, content, button, image } = renderElement({ image: imageElement });

      expect(title).toBeVisible();
      expect(content).toBeVisible();
      expect(button).toBeVisible();
      expect(image).toBeVisible();
    });
  });
});
