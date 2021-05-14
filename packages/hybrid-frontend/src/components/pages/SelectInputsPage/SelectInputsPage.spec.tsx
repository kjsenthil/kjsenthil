import React from 'react';
import { renderWithProviders, screen, waitFor } from '@tsw/test-util';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
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
  const store: Store = configureStore({
    reducer: { auth: reducer.authSlice },
  });

  beforeEach(() => {
    (postGoalCreation as jest.Mock).mockResolvedValue(mockGoals);
    (postObjectiveCreation as jest.Mock).mockResolvedValue(mockObjective);
    (postLinkGoalObjective as jest.Mock).mockResolvedValue(mockLink);
  });

  test('SelectInputsPage titles has been successfully rendered', async () => {
    renderWithProviders(<SelectInputsPage />, store);

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
