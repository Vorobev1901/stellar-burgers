import { configureStore } from '@reduxjs/toolkit';
import { reducer as ingredientReducer } from './ingredientSlice';
import { reducer as burgerConstructorReducer } from './burgerConstructorSlice';
import { reducer as feedReducer } from './feedSlice';
import { reducer as userReducer } from './userSlice';
import { reducer as orderReducer } from './orderSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const store = configureStore({
  reducer: {
    ingredients: ingredientReducer,
    burgerConstructor: burgerConstructorReducer,
    feeds: feedReducer,
    user: userReducer,
    orders: orderReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootStore = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootStore> = selectorHook;

export default store;
