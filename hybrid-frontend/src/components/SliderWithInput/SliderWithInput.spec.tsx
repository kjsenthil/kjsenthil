import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SliderWithInput from './SliderWithInput';

describe('SliderWithInput', () => {
  const defaultProps = {
    defaultValue: 0,
    inputDataTestId: 'slider-input-field',
    label: 'Upfront investment',
    max: 20000,
    min: 0,
    name: 'upfrontInvestment',
    onChange: jest.fn(),
    step: 100,
    value: 100,
    onBlur: jest.fn(),
  };

  let inputField: HTMLInputElement;

  describe('Handles render and onChange events', () => {
    beforeEach(async () => {
      /* eslint-disable react/jsx-props-no-spreading */
      render(<SliderWithInput {...defaultProps} />);
      inputField = await screen.findByTestId(defaultProps.inputDataTestId) as HTMLInputElement;
    });

    test('Renders the slider', async () => {
      expect(await screen.findByRole('slider')).toBeInTheDocument();
      expect(await screen.findByTestId(defaultProps.inputDataTestId)).toBeInTheDocument();
      expect(screen.queryByText('£')).toBeNull();
    });

    test('Calls onChange when input changes', () => {
      fireEvent.change(inputField, { target: { value: '40' } });
      expect(defaultProps.onChange).toBeCalledTimes(1);
    });

    test('Calls onChange when input changes', () => {
      fireEvent.change(inputField, { target: { value: '40' } });
      expect(defaultProps.onChange).toBeCalledTimes(1);
    });
  });

  describe('Handles different data formats', () => {
    test('Renders a currency symbol prefix', async () => {
      /* eslint-disable react/jsx-props-no-spreading */
      render(<SliderWithInput {...defaultProps} isCurrency />);
      expect(await screen.findByText('£')).toBeInTheDocument();
    });
  });
});
