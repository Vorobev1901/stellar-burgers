import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';
import {
  getOrderByNumberApi,
  getOrdersApi,
  TOrderResponse
} from '../utils/burger-api';

export const getOrders = createAsyncThunk('orders/getAll', getOrdersApi);

export const getOrderByNumber = createAsyncThunk(
  'orders/getByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

export type TOrderState = {
  orders: Array<TOrder>;
  isLoading: boolean;
  error: string | null;
  orderOnView: TOrder | null;
};

export const initialState: TOrderState = {
  orders: [],
  isLoading: false,
  error: null,
  orderOnView: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectOrders: (state) => state.orders,
    selectOrderByNumber: (state) => state.orderOnView
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.isLoading = false;
          state.orders = action.payload;
        }
      )
      .addCase(getOrderByNumber.pending, (state) => {
        state.error = null;
        state.orderOnView = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message as string;
      })
      .addCase(
        getOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrderResponse>) => {
          state.orderOnView = action.payload.orders[0];
        }
      );
  }
});

export const reducer = orderSlice.reducer;
export const { selectOrders, selectIsLoading, selectOrderByNumber } =
  orderSlice.selectors;
