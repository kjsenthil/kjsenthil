import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SliderWithInput from './SliderWithInput';

describe('SliderWithInput', () => {
  const defaultProps = {
    defaultValue: 0,
    label: 'Upfront investment',
    max: 20000,
    min: 0,
    name: 'upfrontInvestment',
    onChange: jest.fn(),
    step: 100,
    value: 100,
    onBlur: jest.fn(),
  };

  let inputField: HTMLElement;

  beforeEach(async () => {
    /* eslint-disable react/jsx-props-no-spreading */
    render(<SliderWithInput {...defaultProps} />);
    inputField = await screen.findByTestId('slider-with-input');
  });

  test('Renders the slider', async () => {
    expect(await screen.findByText('Upfront investment')).toBeInTheDocument();
    expect(await screen.findByRole('slider')).toBeInTheDocument();
  });

  test('Calls onChange when input changes', () => {
    /* eslint-disable react/jsx-props-no-spreading */
    render(<SliderWithInput {...defaultProps} />);
    fireEvent.change(inputField, { target: { value: '40' } });
    expect(defaultProps.onChange).toBeCalledTimes(1);
  });

  test('Calls onChange when input changes', () => {
    /* eslint-disable react/jsx-props-no-spreading */
    render(<SliderWithInput {...defaultProps} />);
    fireEvent.change(inputField, { target: { value: '40' } });
    expect(defaultProps.onChange).toBeCalledTimes(1);
  });
});
