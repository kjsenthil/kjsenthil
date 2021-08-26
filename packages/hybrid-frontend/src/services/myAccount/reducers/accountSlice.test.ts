import { Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import accountReducer, { setSelectedAccount } from './accountSlice';

const mockAccountData = {
  id: '142780',
  accountName: 'SIPP ',
  accountType: 'accounts',
  accountTotalHoldings: 110339.91003900001,
  accountTotalNetContribution: -39027.82,
  accountCash: 2598.24,
  accountReturn: 10532.010039,
  accountReturnPercentage: 10.83,
};

describe('accountSlice', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        selectedAccount: accountReducer,
      },
    });
  });

  describe('dispatch setSelectedAccount', () => {
    it('starts with sensible defaults', () => {
      const { account } = store.getState().selectedAccount;
      expect(account).toStrictEqual({});
    });

    it('updates store', async () => {
      await store.dispatch(setSelectedAccount(mockAccountData));
      const { account } = store.getState().selectedAccount;
      expect(account).toBe(mockAccountData);
    });
  });
});
