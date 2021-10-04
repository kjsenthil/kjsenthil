import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import userEvent from '@testing-library/user-event';
import SimulationForm from './SimulationForm';

describe('SimulationForm', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    renderWithTheme(<SimulationForm onSubmit={onSubmit} />);
  });

  it('renders the form without errors', () => {
    expect(screen.getAllByRole('slider')).toHaveLength(3);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onSubmit on button click', () => {
    const updateButton = screen.getByRole('button');
    userEvent.click(updateButton);
    expect(onSubmit).toBeCalledTimes(1);
  });

  test('updates sliders and input values on input change', () => {
    const upfrontInvestment = 10000;
    const monthlyInvestment = 250;
    const investmentPeriod = 25;

    const [
      upfrontInvestmentInputElement,
      upfrontInvestmentSliderElement,
    ] = screen.getAllByLabelText('Upfront investment');
    const [
      monthlyInvestmentInputElement,
      monthlyInvestmentSliderElement,
    ] = screen.getAllByLabelText('Monthly investment');
    const [investmentPeriodInputElement, investmentPeriodSliderElement] = screen.getAllByLabelText(
      'Time horizon'
    );

    userEvent.type(upfrontInvestmentInputElement, `{selectall}${upfrontInvestment}`);
    userEvent.type(monthlyInvestmentInputElement, `{selectall}${monthlyInvestment}`);
    userEvent.type(investmentPeriodInputElement, `{selectall}${investmentPeriod}`);

    expect(upfrontInvestmentInputElement).toHaveValue(upfrontInvestment);
    expect(upfrontInvestmentSliderElement).toHaveAttribute('aria-valuenow', `${upfrontInvestment}`);
    expect(monthlyInvestmentInputElement).toHaveValue(monthlyInvestment);
    expect(monthlyInvestmentSliderElement).toHaveAttribute('aria-valuenow', `${monthlyInvestment}`);
    expect(investmentPeriodInputElement).toHaveValue(investmentPeriod);
    expect(investmentPeriodSliderElement).toHaveAttribute('aria-valuenow', `${investmentPeriod}`);
  });
});
