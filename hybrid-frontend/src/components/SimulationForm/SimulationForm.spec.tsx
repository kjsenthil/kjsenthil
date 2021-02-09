import React from 'react';
import { render, screen } from '@testing-library/react';
import SimulatonForm from './SimulationForm';

describe('SimulatonForm', () => {
  test('Renders the form', async () => {
    render(<SimulatonForm />);
    expect(await screen.findAllByRole('slider')).toHaveLength(3);
    expect(await screen.findByRole('button')).toBeInTheDocument();
  });
});
