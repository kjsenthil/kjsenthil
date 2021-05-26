import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Store } from 'redux';
import { CommonState } from '../types';
import commonActionReducerMapBuilder from './commonActionReducerMapBuilder';

const initialState: CommonState = {
  status: 'idle',
};

interface CustomState {
  data: { type: string };
  included: { type: string };
}

const response = { data: { type: 'data' }, included: { type: 'included' } };
const mockApi = jest.fn();

const fetcher = createAsyncThunk('fetcher', () => mockApi());

const customSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {},
  extraReducers: commonActionReducerMapBuilder<CustomState, CommonState>(fetcher),
});

describe('customSlice', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        custom: customSlice.reducer,
      },
    });
  });

  describe('dispatch fetchInvestmentSummary', () => {
    let action: any;

    beforeEach(() => {
      mockApi.mockResolvedValue(response);
      action = fetcher();
    });

    it('starts with sensible defaults', () => {
      const { status, error, data, included } = store.getState().custom;

      expect(['error', 'loading']).not.toContain(status);
      expect(data).toBeUndefined();
      expect(included).toBeUndefined();
      expect(error).toBeUndefined();
    });

    describe('when call is still pending', () => {
      it('sets status to loading', () => {
        store.dispatch(action);
        const { status, error, data, included } = store.getState().custom;

        expect(mockApi).toHaveBeenCalledTimes(1);
        expect(status).toStrictEqual('loading');
        expect(data).toBeUndefined();
        expect(included).toBeUndefined();
        expect(error).toBeUndefined();
      });
    });

    describe('when call is fulfilled', () => {
      it('sets status to success with data', async () => {
        await store.dispatch(fetcher() as any);
        const { status, error, data, included } = store.getState().custom;

        expect(status).toStrictEqual('success');
        expect(data).toStrictEqual(response.data);
        expect(included).toStrictEqual(response.included);
        expect(error).toBeUndefined();
      });
    });

    describe('when call is rejected', () => {
      it('sets error', async () => {
        const errorMessage = 'Something went wrong';
        mockApi.mockRejectedValue(errorMessage);
        await store.dispatch(action);
        const { status, error } = store.getState().custom;

        expect(status).toStrictEqual('error');
        expect(error).toStrictEqual(errorMessage);
      });
    });
  });
});
