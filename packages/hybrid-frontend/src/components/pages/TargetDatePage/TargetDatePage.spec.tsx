import React from 'react';
import * as gatsby from 'gatsby';
import { configureStore } from '@reduxjs/toolkit';
import { act, waitFor, fireEvent, renderWithProviders, screen } from '@tsw/test-util';
import userEvent from '@testing-library/user-event';
import TargetDatePage, { titleText } from './TargetDatePage';
import { goalSlice } from '../../../services/goal/reducers';

describe('TargetDatePage', () => {
  let inputField: HTMLElement;

  const store = configureStore({
    reducer: {
      goal: goalSlice,
    },
  });

  beforeEach(() => {
    renderWithProviders(<TargetDatePage />, store);
    inputField = screen.getByPlaceholderText('Target Date');
  });

  it('renders title and fields successfully', () => {
    const { targetDate } = store.getState().goal.goalCapture || {};

    expect(screen.getByText(titleText)).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    expect(targetDate).toBeUndefined();
  });

  it('captures upfront investment onChange', async () => {
    fireEvent.change(inputField, { target: { value: '2022-05-21' } });

    const { targetDate } = store.getState().goal.goalCapture || {};

    expect(targetDate).toStrictEqual('2022-05-21');
  });

  it('navigates on Submit', async () => {
    const navigateSpy = jest.spyOn(gatsby, 'navigate');

    const continueButton = screen.getByText('Continue');

    userEvent.click(continueButton);

    await act(async () => {
      await waitFor(() =>
        expect(navigateSpy).toHaveBeenCalledWith('/my-account/upfront-investment')
      );
    });
  });
});
