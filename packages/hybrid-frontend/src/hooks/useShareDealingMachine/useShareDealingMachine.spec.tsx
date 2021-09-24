import { renderHook } from '@testing-library/react-hooks';
import { useMachine } from '@xstate/react';
import { shareDealingContext } from '../../services/shareDealing/machines/shareDealing';
import useShareDealingMachine from '.';

jest.mock('@xstate/react');

const mockUseMachine = useMachine as jest.Mock;

describe('useShareDealingMachine', () => {
  let state;
  let service;
  let send;

  beforeEach(() => {
    state = { matches: jest.fn(), context: shareDealingContext, toStrings: jest.fn() };
    service = { onTransition: jest.fn() };
    send = jest.fn();

    mockUseMachine.mockImplementation(() => [state, send, service]);
  });

  it('returns state, send, service', () => {
    const { result } = renderHook(() =>
      useShareDealingMachine({ accountId: 1111111, isin: 'GB00BH4HKS39' })
    );
    expect(result.current.state).toMatchObject(state);
    expect(result.current.service).toMatchObject(service);

    result.current.send('START_BUYING_ORDER');

    expect(send).toHaveBeenCalledWith('START_BUYING_ORDER');
  });
});
