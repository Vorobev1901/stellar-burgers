import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse,
  updateUserApi
} from '../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../utils/cookie';

export type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  refreshToken: string;
  accessToken: string;
  email: string;
  name: string;
  loginError: string | null;
  registerError: string | null;
};

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  refreshToken: '',
  accessToken: '',
  email: '',
  name: '',
  loginError: null,
  registerError: null
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData) =>
    await registerUserApi({ email, name, password }).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    })
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) =>
    await loginUserApi({ email, password }).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    })
);

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email: string) => await forgotPasswordApi({ email })
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async () =>
    await logoutApi().then((data) => {
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      return data;
    })
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state) => {
      state.isAuthenticated = true;
    }
  },
  selectors: {
    selectAuthChecked: (state) => state.isAuthChecked,
    selectUser: (state) => ({
      email: state.email,
      name: state.name
    }),
    selectAuthenticated: (state) => state.isAuthenticated,
    selectLoginError: (state) => state.loginError,
    selectRegisterError: (state) => state.registerError
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isAuthChecked = true;
        state.registerError = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TAuthResponse>) => {
          state.isAuthChecked = false;
          state.isAuthenticated = true;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
          state.email = action.payload.user.email;
          state.name = action.payload.user.name;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.registerError = action.error.message as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuthChecked = true;
        state.loginError = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<TAuthResponse>) => {
          state.isAuthChecked = false;
          state.isAuthenticated = true;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
          state.email = action.payload.user.email;
          state.name = action.payload.user.name;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.loginError = action.error.message as string;
      })
      .addCase(getUser.pending, (state) => {
        state.isAuthChecked = true;
        state.loginError = null;
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.isAuthChecked = false;
          state.isAuthenticated = true;
          state.email = action.payload.user.email;
          state.name = action.payload.user.name;
        }
      )
      .addCase(getUser.rejected, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthChecked = false;
        state.accessToken = '';
        state.refreshToken = '';
        state.email = '';
        state.name = '';
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = false;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.isAuthChecked = false;
      });
  }
});

export const reducer = userSlice.reducer;
export const { init } = userSlice.actions;
export const {
  selectUser,
  selectAuthChecked,
  selectAuthenticated,
  selectLoginError,
  selectRegisterError
} = userSlice.selectors;
