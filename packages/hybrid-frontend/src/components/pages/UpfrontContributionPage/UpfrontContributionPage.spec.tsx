import React from 'react';
import * as gatsby from 'gatsby';
import { configureStore } from '@reduxjs/toolkit';
import { act, fireEvent, renderWithProviders, screen, waitFor } from '@tsw/test-util';
import userEvent from '@testing-library/user-event';
import UpfrontContributionPage, { titleText } from './UpfrontContributionPage';
import { goalSlice } from '../../../services/goal/reducers';
import { authSlice } from '../../../services/auth/reducers';

jest.mock('../../../services/goal/api', () => ({
  postGoalCreation: jest.fn().mockResolvedValue({}),
}));

describe('UpfrontContributionPage', () => {
  let inputField: HTMLElement;

  const store = configureStore({
    reducer: {
      auth: authSlice,
      goal: goalSlice,
    },
  });

  beforeEach(() => {
    renderWithProviders(<UpfrontContributionPage />, store);
    inputField = screen.getByPlaceholderText('Enter Amount');
  });

  it('renderes titles and field successfully', () => {
    const { upfrontInvestment } = store.getState().goal.goalCapture || {};

    expect(screen.getByText(titleText)).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    expect(upfrontInvestment).toBeUndefined();
  });

  it('captures upfront investment onChange', async () => {
    fireEvent.change(inputField, { target: { value: '200' } });

    const { upfrontInvestment } = store.getState().goal.goalCapture || {};
    expect(upfrontInvestment).toStrictEqual(200);
  });

  it('creates Goal and navigates on Submit', async () => {
    const navigateSpy = jest.spyOn(gatsby, 'navigate');

    const continueButton = screen.getByText('Continue');

    userEvent.click(continueButton);

    await act(async () => {
      await waitFor(() => expect(navigateSpy).toHaveBeenCalledWith('/my-account/sim'));
    });
  });
});
