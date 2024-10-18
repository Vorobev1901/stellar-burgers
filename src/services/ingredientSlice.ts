import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';
import { getIngredientsApi } from '../utils/burger-api';

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

export type TIngredientState = {
  ingredients: Array<TIngredient>;
  isLoading: boolean;
  error: string | null;
};

export const initialState: TIngredientState = {
  ingredients: [],
  isLoading: false,
  error: null
};

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    initState: () => initialState
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIsLoading: (state) => state.isLoading,
    selectIngredientById: (state, id) =>
      state.ingredients.find((i) => i._id === id)
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.isLoading = false;
          state.ingredients = action.payload;
        }
      );
  }
});

export const reducer = ingredientSlice.reducer;
export const { selectIngredients, selectIsLoading, selectIngredientById } =
  ingredientSlice.selectors;
