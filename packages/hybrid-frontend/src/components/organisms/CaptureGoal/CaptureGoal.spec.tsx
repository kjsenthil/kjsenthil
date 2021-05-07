import React from 'react';
import { fireEvent, renderWithTheme, screen } from '@tsw/test-util';
import CaptureGoal from './CaptureGoal';

describe('CaptureGoal', () => {
  const onSubmit = jest.fn();
  let targetAmountField: HTMLElement;
  let targetYearField: HTMLElement;
  let upfrontInvestmentField: HTMLElement;
  let monthlyInvestmentField: HTMLElement;
  let riskAppetiteField: HTMLElement;

  beforeEach(() => {
    renderWithTheme(<CaptureGoal onSubmit={onSubmit} />);

    targetAmountField = screen.getByLabelText('Target Amount');
    targetYearField = screen.getByLabelText('Target Year');
    upfrontInvestmentField = screen.getByLabelText('Upfront Investment');
    monthlyInvestmentField = screen.getByLabelText('Monthly Investment');
    riskAppetiteField = screen.getByLabelText('Risk Appetite');
  });

  test('Renders the form fields', () => {
    expect(targetAmountField).toBeInTheDocument();
    expect(targetYearField).toBeInTheDocument();
    expect(upfrontInvestmentField).toBeInTheDocument();
    expect(monthlyInvestmentField).toBeInTheDocument();
    expect(riskAppetiteField).toBeInTheDocument();
  });

  test('Calls onSubmit with the form values entered', async () => {
    const testGoal = {
      targetAmount: 50000,
      targetYear: 2031,
      targetDate: '05-06-2031',
      upfrontInvestment: 15000,
      monthlyInvestment: 500,
      riskAppetite: 'moderate',
    };

    fireEvent.change(targetAmountField, { target: { value: testGoal.targetAmount } });
    fireEvent.change(targetYearField, { target: { value: testGoal.targetYear } });
    fireEvent.change(upfrontInvestmentField, { target: { value: testGoal.upfrontInvestment } });
    fireEvent.change(monthlyInvestmentField, { target: { value: testGoal.monthlyInvestment } });
    fireEvent.change(riskAppetiteField, { target: { value: testGoal.riskAppetite } });

    const updateButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(updateButton);

    expect(onSubmit).toBeCalledTimes(1);
    expect(onSubmit).toBeCalledWith({
      targetAmount: testGoal.targetAmount,
      targetYear: testGoal.targetYear,
      upfrontInvestment: testGoal.upfrontInvestment,
      monthlyInvestment: testGoal.monthlyInvestment,
      riskAppetite: testGoal.riskAppetite,
      targetDate: testGoal.targetDate,
    });
  });
});
