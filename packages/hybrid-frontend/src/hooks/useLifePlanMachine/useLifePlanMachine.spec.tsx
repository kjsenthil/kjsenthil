import * as React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { renderHook } from '@testing-library/react-hooks';
import { useMachine } from '@xstate/react';
import { lifePlanContext } from '../../services/goal/machines/lifePlan';
import useLifePlanMachine from '.';

jest.mock('@xstate/react');

describe('useLifePlanMachine', () => {
  let wrapper: (props: { children: React.ReactNode }) => React.ReactElement;

  let state;
  let service;
  let send;

  const mockStore = configureStore({
    reducer: () => ({
      client: () => ({ status: 'idle' }),
      currentGoals: () => ({ status: 'idle' }),
      investmentSummary: () => ({ status: 'idle' }),
      investmentAccounts: () => ({ status: 'idle' }),
    }),
  });

  beforeEach(() => {
    state = { matches: jest.fn(), context: lifePlanContext, toStrings: jest.fn() };
    service = { onTransition: jest.fn() };
    send = jest.fn();

    (useMachine as jest.Mock).mockImplementation(() => [state, send, service]);
    wrapper = ({ children }) => <Provider store={mockStore}>{children}</Provider>;
  });

  it('returns state, send, service', () => {
    const { result } = renderHook(() => useLifePlanMachine(), { wrapper });
    expect(result.current.state).toMatchObject(state);
    expect(result.current.service).toMatchObject(service);

    result.current.send('SAVE');

    expect(send).toHaveBeenCalledWith('SAVE');
  });
});
