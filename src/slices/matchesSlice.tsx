import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getApi } from '../utils/api';
import { TResponce, TMatch } from '../utils/types';

interface matchesState {
  res: TResponce | null | undefined;
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
  async () => await getApi()
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
