import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import authReducer, { credLogin, pinLogin, refreshToken } from './authSlice';
import * as api from '../api';
import { tokens } from '../mocks';

const contactId = 1234567;

jest.mock('../api', () => ({
  postLogin: jest.fn(),
  postPin: jest.fn(),
  postRefreshToken: jest.fn(),
}));

describe('authSlice', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  });

  describe('dispatch credLogin', () => {
    const credLoginAction = credLogin({ username: 'John', password: 'password' }) as any;

    beforeEach(() => {
      (api.postLogin as jest.Mock).mockResolvedValue({
        data: {
          attributes: {
            twoStepAuthCode: 1234,
          },
        },
      });
    });

    it('starts with sensible defaults', () => {
      const { status, twoStepAuthCode, isCredLoggedIn, isPinLoggedIn } = store.getState().auth;

      expect(status).toStrictEqual('idle');
      expect(twoStepAuthCode).toBeUndefined();
      expect(isCredLoggedIn).toBe(false);
      expect(isPinLoggedIn).toBe(false);
    });

    describe('when call is still pending', () => {
      it('sets status to loading', async () => {
        store.dispatch(credLoginAction);
        const { status, twoStepAuthCode, isCredLoggedIn } = store.getState().auth;

        expect(status).toStrictEqual('loading');
        expect(twoStepAuthCode).toBeUndefined();
        expect(isCredLoggedIn).toBe(false);
      });
    });

    describe('when call is fulfilled', () => {
      it('sets twpStepAuthCode', async () => {
        await store.dispatch(credLoginAction);
        const { status, twoStepAuthCode, isCredLoggedIn } = store.getState().auth;

        expect(status).toStrictEqual('success');
        expect(twoStepAuthCode).toStrictEqual(1234);
        expect(isCredLoggedIn).toBe(true);
      });
    });

    describe('when call is rejected', () => {
      it('sets credLoginError', async () => {
        const error = 'Something went wrong';
        (api.postLogin as jest.Mock).mockRejectedValue(error);
        await store.dispatch(credLoginAction);
        const { status, twoStepAuthCode, isCredLoggedIn, credLoginError } = store.getState().auth;

        expect(status).toStrictEqual('error');
        expect(twoStepAuthCode).toBeUndefined();
        expect(credLoginError).toStrictEqual(error);
        expect(isCredLoggedIn).toBe(false);
      });
    });
  });

  describe('dispatch pinLogin', () => {
    const pinFromValues = [
      { position: 1, value: 5 },
      { position: 2, value: 3 },
      { position: 3, value: 5 },
    ];
    const pinLoginAction = pinLogin(pinFromValues) as any;

    beforeEach(() => {
      (api.postPin as jest.Mock).mockResolvedValue({
        data: {
          attributes: {
            tokens,
            contactId,
          },
        },
      });
    });

    describe('when call is still pending', () => {
      it('sets status to loading', async () => {
        store.dispatch(pinLoginAction);
        const { status, isPinLoggedIn } = store.getState().auth;

        expect(status).toStrictEqual('loading');
        expect(isPinLoggedIn).toBe(false);
      });
    });

    describe('when call is fulfilled', () => {
      it('sets tokens and contect Id and handles login session', async () => {
        await store.dispatch(pinLoginAction);
        const { status, isPinLoggedIn, accessTokens } = store.getState().auth;

        expect(status).toStrictEqual('success');
        expect(isPinLoggedIn).toBe(true);
        expect(accessTokens).toStrictEqual(tokens);
      });
    });

    describe('when call is rejected', () => {
      it('sets pinLoginError', async () => {
        const error = 'Something went wrong';
        (api.postPin as jest.Mock).mockRejectedValue(error);
        await store.dispatch(pinLoginAction);
        const { status, isPinLoggedIn, pinLoginError } = store.getState().auth;

        expect(status).toStrictEqual('error');
        expect(pinLoginError).toStrictEqual(error);
        expect(isPinLoggedIn).toBe(false);
      });
    });
  });

  describe('dispatch refreshToken', () => {
    const refreshTokenAction = refreshToken() as any;

    beforeEach(() => {
      (api.postRefreshToken as jest.Mock).mockResolvedValue({
        data: {
          attributes: {
            newTokens: tokens,
          },
        },
      });
    });

    describe('when call is still pending', () => {
      it('sets status to loading', async () => {
        store.dispatch(refreshTokenAction);
        const { status } = store.getState().auth;
        expect(status).toStrictEqual('loading');
      });
    });

    describe('when call is fulfilled', () => {
      it('sets the access tokens', async () => {
        await store.dispatch(refreshTokenAction);
        const { status, accessTokens } = store.getState().auth;

        expect(status).toStrictEqual('success');
        expect(accessTokens).toStrictEqual(tokens);
      });
    });

    describe('when call is rejected', () => {
      it('forces a logout', async () => {
        const error = 'Something went wrong';
        (api.postRefreshToken as jest.Mock).mockRejectedValue(error);
        await store.dispatch(refreshTokenAction);
        const { status, isPinLoggedIn, isCredLoggedIn } = store.getState().auth;

        expect(status).toStrictEqual('error');
        expect(isPinLoggedIn).toBe(false);
        expect(isCredLoggedIn).toBe(false);
      });
    });
  });
});
