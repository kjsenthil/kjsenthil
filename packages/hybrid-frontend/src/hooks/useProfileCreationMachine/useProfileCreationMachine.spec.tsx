import { renderHook } from '@testing-library/react-hooks';
import { useMachine } from '@xstate/react';
import { profileCreationContext } from '../../services/profile/machines/profileCreation';
import useprofileCreationMachine from '.';

jest.mock('@xstate/react');

const mockUseMachine = useMachine as jest.Mock;

describe('useProfileCreationMachine', () => {
  let state;
  let service;
  let send;

  beforeEach(() => {
    state = { matches: jest.fn(), context: profileCreationContext, toStrings: jest.fn() };
    service = { onTransition: jest.fn() };
    send = jest.fn();

    mockUseMachine.mockImplementation(() => [state, send, service]);
  });

  it('returns state, send, service', () => {
    const { result } = renderHook(() => useprofileCreationMachine());
    expect(result.current.state).toMatchObject(state);
    expect(result.current.service).toMatchObject(service);

    result.current.send('SET_ACCOUNT_TYPE');

    expect(send).toHaveBeenCalledWith('SET_ACCOUNT_TYPE');
  });
});
