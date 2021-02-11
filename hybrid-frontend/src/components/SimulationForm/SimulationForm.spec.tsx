import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SimulatonForm from './SimulationForm';

describe('SimulatonForm', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    render(<SimulatonForm onSubmit={onSubmit} />);
  });

  test('Renders the form', async () => {
    expect(await screen.findAllByRole('slider')).toHaveLength(3);
    expect(await screen.findByRole('button')).toBeInTheDocument();
  });

  test('Calls onSubmit on button click', async () => {
    const updateButton = await screen.findByRole('button');
    fireEvent.click(updateButton);
    expect(onSubmit).toBeCalledTimes(1);
  });
});
