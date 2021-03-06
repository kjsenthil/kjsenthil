import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, renderWithTheme } from '@tsw/test-util';
import ToggleGroup from './ToggleGroup';

describe('ToggleGroup', () => {
  describe('Ordered Toggle Group with no initial value selected', () => {
    const TestComponent = () => {
      const [selected, setSelected] = React.useState<string | null>(null);

      const handleChange = (newSelected: string | null) => {
        setSelected(newSelected);
      };

      const values = ['Content One', 'Content Two'];

      return (
        <ToggleGroup
          layout="onePerRow"
          values={values}
          selectedValue={selected}
          setSelectedValue={handleChange}
        />
      );
    };

    let button1;
    let button2;

    beforeEach(() => {
      renderWithTheme(<TestComponent />);

      button1 = screen.getByLabelText('Content One');
      button2 = screen.getByLabelText('Content Two');
    });

    it('renders correctly', () => {
      expect(button1).toBeVisible();
      expect(button2).toBeVisible();
    });

    test('the underlying toggle buttons can be selected/unselected as expected', () => {
      // Buttons start out unselected as expected

      expect(button1).toHaveAttribute('aria-pressed', 'false');
      expect(button2).toHaveAttribute('aria-pressed', 'false');

      // Clicking on Button 1 should set it to a selected state

      userEvent.click(button1);

      expect(button1).toHaveAttribute('aria-pressed', 'true');
      expect(button2).toHaveAttribute('aria-pressed', 'false');

      // Clicking on Button 1 again should set it to an un-selected state

      userEvent.click(button1);

      expect(button1).toHaveAttribute('aria-pressed', 'false');
      expect(button2).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('Unordered Toggle Group with initial value selected', () => {
    const TestComponent = () => {
      const values = ['Content One', 'Content Two'];

      const [selected, setSelected] = React.useState<string | null>(values[0]);

      const handleChange = (newSelected: string | null) => {
        setSelected(newSelected);
      };

      return (
        <ToggleGroup
          layout="dynamic"
          values={values}
          selectedValue={selected}
          setSelectedValue={handleChange}
        />
      );
    };

    let button1;
    let button2;

    beforeEach(() => {
      renderWithTheme(<TestComponent />);

      button1 = screen.getByLabelText('button 1');
      button2 = screen.getByLabelText('button 2');
    });

    it('renders correctly', () => {
      expect(button1).toBeVisible();
      expect(button2).toBeVisible();
    });

    test('the first button is selected from the start', () => {
      // Buttons start out unselected as expected

      expect(button1).toHaveAttribute('aria-pressed', 'true');
      expect(button2).toHaveAttribute('aria-pressed', 'false');

      // Clicking on Button 2 should set it to a selected state

      userEvent.click(button2);

      expect(button1).toHaveAttribute('aria-pressed', 'false');
      expect(button2).toHaveAttribute('aria-pressed', 'true');
    });
  });
});
