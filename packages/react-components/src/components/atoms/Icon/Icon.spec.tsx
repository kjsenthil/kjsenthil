import React from 'react';
import { render } from '@tsw/test-util';
import Icon, { IconProps } from './Icon';
import icons from './icons';

describe('Icon', () => {
  (Object.keys(icons) as Array<IconProps['name']>).forEach((name) => {
    test(`renders an svg with an svg path by name: ${name}`, () => {
      const { container } = render(<Icon name={name} />);
      const path = container.querySelector('path');
      expect(path?.getAttribute('d')).toStrictEqual(icons[name]);
    });
  });
});
