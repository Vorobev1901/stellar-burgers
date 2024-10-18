import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  nanoid
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '../utils/types';
import { orderBurgerApi, TNewOrderResponse } from '../utils/burger-api';

export const newOrder = createAsyncThunk('burger/newOrder', orderBurgerApi);

type TBurgerConstructorState = {
  constructorItem: TConstructorItem;
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

export type TConstructorItem = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  constructorItem: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? (state.constructorItem.bun = action.payload)
          : state.constructorItem.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItem.ingredients =
        state.constructorItem.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      const temp = state.constructorItem.ingredients[action.payload - 1];
      state.constructorItem.ingredients[action.payload - 1] =
        state.constructorItem.ingredients[action.payload];
      state.constructorItem.ingredients[action.payload] = temp;
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      const temp = state.constructorItem.ingredients[action.payload + 1];
      state.constructorItem.ingredients[action.payload + 1] =
        state.constructorItem.ingredients[action.payload];
      state.constructorItem.ingredients[action.payload] = temp;
    },
    clearConstructor: (state) => {
      state.constructorItem = {
        bun: null,
        ingredients: []
      };
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    selectConstructorItem: (state) => state.constructorItem,
    selectOrderRequest: (state) => state.orderRequest,
    selectOderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(newOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderModalData = null;
      })
      .addCase(newOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = null;
      })
      .addCase(
        newOrder.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.orderRequest = false;
          state.orderModalData = action.payload.order;
        }
      );
  }
});

export const reducer = burgerConstructorSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;
export const {
  selectConstructorItem,
  selectOrderRequest,
  selectOderModalData
} = burgerConstructorSlice.selectors;
