import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { act, fireEvent, renderWithTheme, screen, waitFor } from '@tsw/test-util';
import userEvent from '@testing-library/user-event';
import UpfrontContributionPage, { titleText } from './UpfrontContributionPage';
import { mockGoals, mockObjective, mockLink } from '../../../../__mocks__/jestMock';
import { GlobalProvider } from '../../../context/GlobalContextProvider';
import useGlobalContextValue from '../../../hooks/GlobalContextHooks/useGlobalContextValue';

import postGoalCreation from '../../../api/postGoalCreation';
import postLinkGoalObjective from '../../../api/postLinkGoalObjective';
import postObjectiveCreation from '../../../api/postObjectiveCreation';

import * as reducer from '../../../services/auth/reducers';

jest.mock('../../../hooks/GlobalContextHooks/useGlobalContextValue');

jest.mock('../../../api/postGoalCreation');
jest.mock('../../../api/postObjectiveCreation');
jest.mock('../../../api/postLinkGoalObjective');

describe('UpfrontContributionPage', () => {
  let inputField: HTMLElement;
  let Component: React.ComponentType;
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: reducer.authSlice,
      },
    });

    Component = () => (
      <Provider store={store}>
        <UpfrontContributionPage />
      </Provider>
    );
  });

  test('UpfrontContributionPage titles and field has been successfully rendered', () => {
    renderWithTheme(<Component />);
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

    renderWithTheme(
      <GlobalProvider>
        <Component />
      </GlobalProvider>
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

    renderWithTheme(<Component />);
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
