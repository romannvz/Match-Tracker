import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMatchesAPI, retryMechanics } from '../components/shared/api/api';
import { TResponceMatches, TMatch } from '../utils/types';

interface matchesState {
  res: TResponceMatches | null | undefined;
  isOk: boolean;
  matches: TMatch[];
  isLoading: boolean;
  isError: boolean;
  error: string | null | undefined;
}

const initialState: matchesState = {
  res: null,
  isOk: false,
  matches: [],
  isLoading: false,
  isError: false,
  error: null
};

export const getMatches = createAsyncThunk(
  'getMatches',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchMatchesAPI();
    } catch (err) {
      console.log(
        `Error in first fetch '${getMatches.typePrefix}'. Trying again..`
      );
      const res = await retryMechanics(fetchMatchesAPI, 3, 2); //call fetchMatchesAPI() for 3 times with delayed 10s between calls
      if (typeof res == 'string') return rejectWithValue(res);
      return res;
    }
  }
);

const matchesSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  selectors: {
    responceSelector: (state) => state.res,
    isOkSelector: (state) => state.isOk,
    matchesSelector: (state) => state.matches,
    isLoadingSelector: (state) => state.isLoading,
    isErrorSelector: (state) => state.isError,
    errorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMatches.pending, (state) => {
        state.isLoading = true;
        state.isOk = false;
        state.error = null;
        state.isError = false;
      })
      .addCase(getMatches.rejected, (state, action) => {
        state.isLoading = false;
        state.isOk = false;
        state.isError = true;
        if (action.payload)
          if (typeof action.payload === 'string')
            action.error.message = String(action.payload);
        state.error = action.error.message;
      })
      .addCase(getMatches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isOk = true;
        state.res = action.payload;
        state.matches = action.payload.data.matches;
      });
  }
});

export const {
  responceSelector,
  isOkSelector,
  matchesSelector,
  isLoadingSelector,
  isErrorSelector,
  errorSelector
} = matchesSlice.selectors;

export const reducer = matchesSlice.reducer;
