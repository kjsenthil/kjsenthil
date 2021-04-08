import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import GoalSelection from './GoalSelection';
import { Goals } from '../../../constants';

describe('GoalSelection', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    render(<GoalSelection onSubmit={onSubmit} />);
  });

  test('Does not call onSubmit if no goal was selected', () => {
    fireEvent.click(screen.getByText('Select'));

    expect(onSubmit).toBeCalledTimes(0);
  });

  test.each`
    goal
    ${Goals.BABY}
    ${Goals.HOUSE}
    ${Goals.HOLIDAY}
    ${Goals.UNIVERSITY}
  `('Calls onSubmit with the selected goal ', ({ goal }) => {
    const goalText = screen.getByText(goal);
    expect(goalText.closest('div')?.getAttribute('class')).toContain('MuiPaper-elevation3');
    fireEvent.click(goalText);

    fireEvent.click(screen.getByText('Select'));

    expect(goalText.closest('div')?.getAttribute('class')).toContain('MuiPaper-elevation1');
    expect(onSubmit).toBeCalledTimes(1);
    expect(onSubmit).toBeCalledWith(goal);
  });
});
