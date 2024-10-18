import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';
import { getFeedsApi, TFeedsResponse } from '../utils/burger-api';

export const getFeeds = createAsyncThunk('feeds/getAll', getFeedsApi);

export type TFeedState = {
  orders: Array<TOrder>;
  isLoading: boolean;
  error: string | null;
  total: number;
  totalToday: number;
};

export type TFeed = {
  total: number;
  totalToday: number;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectOrders: (state) => state.orders,
    selectFeed: (state) => ({
      total: state.total,
      totalToday: state.totalToday
    }),
    selectOrderByNumber: (state, number) =>
      state.orders.find((order) => order.number === number)
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(
        getFeeds.fulfilled,
        (state, action: PayloadAction<TFeedsResponse>) => {
          state.isLoading = false;
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      );
  }
});

export const reducer = feedSlice.reducer;
export const {
  selectOrders,
  selectIsLoading,
  selectFeed,
  selectOrderByNumber
} = feedSlice.selectors;
