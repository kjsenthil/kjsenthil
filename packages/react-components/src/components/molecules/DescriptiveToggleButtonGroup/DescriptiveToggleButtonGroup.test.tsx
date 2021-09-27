import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, renderWithTheme } from '@tsw/test-util';
import DescriptiveToggleButtonGroup from './DescriptiveToggleButtonGroup';
import { DescriptiveToggleButton } from '../DescriptiveToggleButton';

describe('DescriptiveToggleButtonGroup', () => {
  const TestComponent = () => {
    const [selected, setSelected] = React.useState<number | null>(null);

    const handleChange = (e: React.MouseEvent<HTMLElement>, value: number | null) => {
      setSelected(value);
    };

    return (
      <DescriptiveToggleButtonGroup value={selected} onChange={handleChange}>
        <DescriptiveToggleButton
          idNumber={1}
          content="Content One"
          value={0}
          aria-label="Button 1"
        />
        <DescriptiveToggleButton
          idNumber={2}
          content="Content Two"
          value={1}
          aria-label="Button 2"
        />
      </DescriptiveToggleButtonGroup>
    );
  };

  let button1;
  let button2;

  beforeEach(() => {
    renderWithTheme(<TestComponent />);

    button1 = screen.getByLabelText('Button 1');
    button2 = screen.getByLabelText('Button 2');
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
