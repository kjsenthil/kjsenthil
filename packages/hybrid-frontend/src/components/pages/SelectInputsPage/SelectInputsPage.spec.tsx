import React from 'react';
import { Store } from 'redux';
import { renderWithTheme, screen, waitFor } from '@tsw/test-util';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import {
  postLinkGoalObjective,
  postGoalCreation,
  postObjectiveCreation,
} from '../../../services/goalsAndObjectives';
import * as reducer from '../../../services/auth/reducers';
import SelectInputsPage from './SelectInputsPage';
import { mockGoals, mockObjective, mockLink } from '../../../../__mocks__/jestMock';

jest.mock('../../../services/goalsAndObjectives');

describe('SelectInputsPage', () => {
  let store: Store;

  let Component: React.ComponentType;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: reducer.authSlice,
      },
    });

    Component = () => (
      <Provider store={store}>
        <SelectInputsPage />
      </Provider>
    );
    (postGoalCreation as jest.Mock).mockResolvedValue(mockGoals);
    (postObjectiveCreation as jest.Mock).mockResolvedValue(mockObjective);
    (postLinkGoalObjective as jest.Mock).mockResolvedValue(mockLink);
  });

  test('SelectInputsPage titles has been successfully rendered', async () => {
    renderWithTheme(<Component />);

    expect(screen.getByLabelText('Target Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('Target Year')).toBeInTheDocument();
    expect(screen.getByLabelText('Upfront Investment')).toBeInTheDocument();
    expect(screen.getByLabelText('Monthly Investment')).toBeInTheDocument();
    expect(screen.getByLabelText('Risk Appetite')).toBeInTheDocument();

    const submit = screen.getByText('Submit');

    userEvent.click(submit);
    await waitFor(() => expect(postGoalCreation).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(postObjectiveCreation).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(postLinkGoalObjective).toHaveBeenCalledTimes(1));
  });
});
