import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBankAccountDetails } from '../api';
import { AuthState } from '../../auth';

export const fetchBankAccountDetails = createAsyncThunk(
  'client/fetchBankAccountDetails',
  (_, { getState }) => {
    const {
      auth: { contactId = 0 },
    } = getState() as { auth: AuthState };

    if (contactId === undefined) throw new Error('No selected client data found in state');

    return getBankAccountDetails(contactId);
  }
);

export default fetchBankAccountDetails;
