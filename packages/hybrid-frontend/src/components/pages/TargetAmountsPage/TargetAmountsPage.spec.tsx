import React from 'react';
import * as gatsby from 'gatsby';
import { configureStore } from '@reduxjs/toolkit';
import { act, waitFor, fireEvent, renderWithProviders, screen } from '@tsw/test-util';
import userEvent from '@testing-library/user-event';
import TargetAmountsPage, { titleText } from './TargetAmountsPage';
import { goalSlice } from '../../../services/goal/reducers';

describe('TargetAmountsPage', () => {
  let inputField: HTMLElement;

  const store = configureStore({
    reducer: {
      goal: goalSlice,
    },
  });

  beforeEach(() => {
    renderWithProviders(<TargetAmountsPage />, store);
    inputField = screen.getByPlaceholderText('Target Amount');
  });

  it('renders title and fields successfully', () => {
    const { targetAmount } = store.getState().goal.goalCapture || {};

    expect(screen.getByText(titleText)).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    expect(targetAmount).toBeUndefined();
  });

  it('captures upfront investment onChange', async () => {
    fireEvent.change(inputField, { target: { value: '4000' } });

    const { targetAmount } = store.getState().goal.goalCapture || {};

    expect(targetAmount).toStrictEqual(4000);
  });

  it('navigates on Submit', async () => {
    const navigateSpy = jest.spyOn(gatsby, 'navigate');

    const continueButton = screen.getByText('Continue');

    userEvent.click(continueButton);

    await act(async () => {
      await waitFor(() => expect(navigateSpy).toHaveBeenCalledWith('/my-account/target-date'));
    });
  });
});
