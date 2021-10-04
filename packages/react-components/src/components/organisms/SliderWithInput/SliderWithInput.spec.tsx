import React from 'react';
import { fireEvent, renderWithTheme, screen } from '@tsw/test-util';
import userEvent from '@testing-library/user-event';
import SliderWithInput, { SliderWithInputProps } from './SliderWithInput';

type BaseSliderWithInputProps = Omit<SliderWithInputProps, 'value' | 'setValue'>;

describe('SliderWithInput', () => {
  let headingElement;
  let inputElement;
  let sliderElement;

  const baseSliderWithInputProps: BaseSliderWithInputProps = {
    label: 'Slider label',
    name: 'sliderName',
  };

  const TestComponent = (props: BaseSliderWithInputProps) => {
    const [value, setValue] = React.useState(0);

    return <SliderWithInput {...props} value={value} setValue={setValue} />;
  };

  const setupElements = () => {
    // There are 2x elements with the same text, a heading element and a
    // <label> element.
    [headingElement] = screen.getAllByText(baseSliderWithInputProps.label);

    // There are 2x elements with the same label text, an <input> element and
    // a <span> element (our slider).
    [inputElement, sliderElement] = screen.getAllByLabelText(baseSliderWithInputProps.label);
  };

  describe('Default variant', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      renderWithTheme(<TestComponent {...baseSliderWithInputProps} />);

      setupElements();
    });

    test('The slider is rendered without errors', () => {
      expect(headingElement).toBeVisible();
      expect(inputElement).toBeVisible();
      expect(sliderElement).toBeVisible();
    });

    test('The input and slider changes when the input is updated', () => {
      userEvent.type(inputElement, '50');

      expect(inputElement).toHaveValue(50);
      expect(sliderElement).toHaveAttribute('aria-valuenow', '50');
    });

    test('The input and slider changes when the slider is updated', () => {
      // Move the slider 1 step forward using the keyboard
      fireEvent.keyDown(sliderElement, {
        key: 'ArrowRight',
      });

      expect(inputElement).toHaveValue(1);
      expect(sliderElement).toHaveAttribute('aria-valuenow', '1');
    });

    test('The input has some info text when the value is outside of the min-max range', () => {
      // Type something > max

      userEvent.type(inputElement, '{selectall}101');

      expect(screen.getByText(`Please input a number smaller than 100`)).toBeVisible();

      // Type something < min

      userEvent.type(inputElement, '{selectall}-1');

      expect(screen.getByText(`Please input a number larger than 0`)).toBeVisible();
    });
  });

  describe('Currency variant', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      renderWithTheme(<TestComponent {...baseSliderWithInputProps} isCurrency />);

      setupElements();
    });

    test('The input is of the currency variant', () => {
      expect(screen.getByTitle('britishPound')).toBeInTheDocument();
    });
  });
});
