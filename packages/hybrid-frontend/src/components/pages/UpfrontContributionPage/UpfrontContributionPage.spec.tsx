import React from 'react';
import { act, fireEvent, renderWithProviders, screen, waitFor } from '@tsw/test-util';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import UpfrontContributionPage, { titleText } from './UpfrontContributionPage';
import { mockGoals, mockObjective, mockLink } from '../../../../__mocks__/jestMock';
import { GlobalProvider } from '../../../context/GlobalContextProvider';
import useGlobalContextValue from '../../../hooks/GlobalContextHooks/useGlobalContextValue';
import {
  postLinkGoalObjective,
  postGoalCreation,
  postObjectiveCreation,
} from '../../../services/goalsAndObjectives';
import * as reducer from '../../../services/auth/reducers';

jest.mock('../../../hooks/GlobalContextHooks/useGlobalContextValue');

jest.mock('../../../services/goalsAndObjectives');

describe('UpfrontContributionPage', () => {
  let inputField: HTMLElement;

  const store: Store = configureStore({
    reducer: { auth: reducer.authSlice },
  });

  test('UpfrontContributionPage titles and field has been successfully rendered', () => {
    renderWithProviders(<UpfrontContributionPage />, store);

    inputField = screen.getByPlaceholderText('Enter Amount');
    expect(screen.getByText(titleText)).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
  });

  test('UpfrontContributionPage Onchange event', async () => {
    const setGoalCaptureMock = jest.fn();

    (useGlobalContextValue as jest.Mock).mockImplementation(() => ({
      goalCapture: {},
      setGoalCapture: setGoalCaptureMock,
    }));

    renderWithProviders(
      <GlobalProvider>
        <UpfrontContributionPage />
      </GlobalProvider>,
      store
    );

    inputField = screen.getByPlaceholderText('Enter Amount');
    fireEvent.change(inputField, { target: { value: '200' } });

    expect(useGlobalContextValue).toHaveBeenCalledTimes(1);
    expect(setGoalCaptureMock).toHaveBeenCalledTimes(1);
  });

  test('UpfrontContributionPage onSubmit event', async () => {
    (postGoalCreation as jest.Mock).mockResolvedValue(mockGoals);
    (postObjectiveCreation as jest.Mock).mockResolvedValue(mockObjective);
    (postLinkGoalObjective as jest.Mock).mockResolvedValue(mockLink);

    renderWithProviders(<UpfrontContributionPage />, store);

    inputField = screen.getByPlaceholderText('Enter Amount');

    fireEvent.change(inputField, { target: { value: '200' } });

    const continueButton = screen.getByText('Continue');

    userEvent.click(continueButton);

    await act(async () => {
      await waitFor(() => expect(postGoalCreation).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(postObjectiveCreation).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(postLinkGoalObjective).toHaveBeenCalledTimes(1));
    });
  });
});
