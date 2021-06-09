import React from 'react';
import * as gatsby from 'gatsby';
import { configureStore } from '@reduxjs/toolkit';
import { act, waitFor, renderWithProviders, screen } from '@tsw/test-util';
import userEvent from '@testing-library/user-event';
import SelectGoalsPage from './SelectGoalsPage';
import { goalCreationSlice } from '../../../services/goal/reducers';

jest.mock('../../templates/MyAccountLayout', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

jest.mock('../../templates', () => ({
  MyAccountLayout: ({ children }) => children,
}));

jest.mock('../../organisms', () => ({
  GoalSelection: ({ onSubmit }) => (
    <button type="button" onClick={() => onSubmit('home')}>
      Continue
    </button>
  ),
}));

describe('SelectGoalsPage', () => {
  const store = configureStore({
    reducer: {
      goalCreation: goalCreationSlice,
    },
  });

  beforeEach(() => {
    renderWithProviders(<SelectGoalsPage />, store);
  });

  it('does not set goal before submit', () => {
    const { name } = store.getState().goalCreation.goalDetails || {};

    expect(name).toBeUndefined();
  });

  it('sets goal and navigates on Submit', async () => {
    const navigateSpy = jest.spyOn(gatsby, 'navigate');

    const continueButton = screen.getByText('Continue');

    userEvent.click(continueButton);

    await act(async () => {
      await waitFor(() => {
        const { name } = store.getState().goalCreation.goalDetails || {};

        expect(name).toStrictEqual('home');
        expect(navigateSpy).toHaveBeenCalledWith('/my-account/target-amount');
      });
    });
  });
});
