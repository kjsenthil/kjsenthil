import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import Alert from './Alert';

jest.mock('../../atoms/Icon', () => ({
  __esModule: true,
  default: ({ name }) => <div>{name}</div>,
}));

describe('Alert', () => {
  test('Renders Alert success case', () => {
    renderWithTheme(<Alert severity="success">Success!</Alert>);
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('successTick')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('Renders Alert error case', () => {
    renderWithTheme(<Alert severity="error">Error!</Alert>);
    expect(screen.getByText('Error!')).toBeInTheDocument();
    expect(screen.getByText('errorCircle')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
