import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState } from '../../auth';
import { getPerformanceContact } from '../api';

const fetchPerformanceContact = createAsyncThunk(
  'performance/fetchPerformanceContact',
  (_, { getState }) => {
    const {
      auth: { contactId = 0 },
    } = getState() as { auth: AuthState };

    return getPerformanceContact({ contactId });
  }
);

export default fetchPerformanceContact;
