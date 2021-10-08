import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import { Pin, PinProps } from './Pin';

jest.mock('../../atoms/Icon', () => ({
  __esModule: true,
  default: () => <div>eye</div>,
}));

jest.mock('react-pin-field', () => ({
  __esModule: true,
  default: (props) => <input title="input" {...props} />,
}));

describe('Pin', () => {
  const pinProps: PinProps = {
    length: 6,
    validate: '1234567890',
    value: '123456',
    typographyProps: {
      variant: 'sh4',
      color: 'primary',
    },
    headerLabel: 'Create a PIN*',
  };

  beforeEach(() => {
    renderWithTheme(<Pin {...pinProps} />);
  });

  it('renders a pin component', () => {
    expect(screen.getByTitle('input')).toBeInTheDocument();
  });
});
