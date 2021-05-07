import React from 'react';
import { renderWithTheme, screen, waitFor } from '@tsw/test-util';
import userEvent from '@testing-library/user-event';
import postGoalCreation from '../../../api/postGoalCreation';
import postObjectiveCreation from '../../../api/postObjectiveCreation';
import postLinkGoalObjective from '../../../api/postLinkGoalObjective';
import SelectInputsPage from './SelectInputsPage';
import { mockGoals, mockObjective, mockLink } from '../../../../__mocks__/jestMock';

jest.mock('../../../api/postGoalCreation');
jest.mock('../../../api/postObjectiveCreation');
jest.mock('../../../api/postLinkGoalObjective');

describe('SelectInputsPage', () => {
  beforeEach(() => {
    (postGoalCreation as jest.Mock).mockResolvedValue(mockGoals);
    (postObjectiveCreation as jest.Mock).mockResolvedValue(mockObjective);
    (postLinkGoalObjective as jest.Mock).mockResolvedValue(mockLink);
  });

  test('SelectInputsPage titles has been successfully rendered', async () => {
    renderWithTheme(<SelectInputsPage />);

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
