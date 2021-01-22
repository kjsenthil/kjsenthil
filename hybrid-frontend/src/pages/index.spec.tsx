import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './index';

describe('Index', () => {
  test('Displays the correct title', () => {
    render(<Home />);
    expect(screen.getByTestId('home-title')).toHaveTextContent('Digital Hybrid Demo');
  });
});

