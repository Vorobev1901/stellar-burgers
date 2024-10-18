import {
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TServerResponse,
  TUserResponse
} from '../utils/burger-api';
import {
  forgotPassword,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  TUserState,
  updateUser,
  initialState,
  reducer as userReducer
} from '../../src/services/userSlice';

describe('Проверка редьюсера слайса user', () => {
  const userRegData: TRegisterData = {
    email: 'test@list.ru',
    name: 'Test',
    password: '123456'
  };

  const userLogData: TLoginData = {
    email: 'test@list.ru',
    password: '123456'
  };

  it('Должен установить для isAuthChecked значение true и для registerError значение null при отправке registerUser.pending', () => {
    const expectedState: TUserState = {
      ...initialState,
      isAuthChecked: true
    };

    const actualState = userReducer(
      {
        ...initialState,
        registerError: 'test'
      },
      registerUser.pending('', userRegData)
    );
    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить для полей user соответствующие значения при registerUser.fulfilled', () => {
    const expectedState: TUserState = {
      ...initialState,
      isAuthChecked: false,
      isAuthenticated: true,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      email: 'test@list.ru',
      name: 'Test'
    };

    const userTestData: TAuthResponse = {
      success: true,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      user: {
        email: 'test@list.ru',
        name: 'Test'
      }
    };

    const actualState = userReducer(
      {
        ...initialState
      },
      registerUser.fulfilled(userTestData, '', userRegData)
    );
    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить для isAuthChecked значение false и для registerError значение ошибки при отправке registerUser.rejected', () => {
    const expectedState: TUserState = {
      ...initialState,
      registerError: 'test error'
    };

    const actualState = userReducer(
      {
        ...initialState
      },
      registerUser.rejected(new Error('test error'), '', userRegData)
    );
    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить для isAuthChecked значение false и для registerError значение null при отправке loginUser.pending', () => {
    const expectedState: TUserState = {
      ...initialState,
      isAuthChecked: true
    };

    const actualState = userReducer(
      {
        ...initialState,
        loginError: 'test error'
      },
      loginUser.pending('', userLogData)
    );
    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить для полей user соответствующие значения при loginUser.fulfilled', () => {
    const expectedState: TUserState = {
      ...initialState,
      isAuthChecked: false,
      isAuthenticated: true,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      email: 'test@list.ru',
      name: 'Test'
    };

    const userTestData: TAuthResponse = {
      success: true,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      user: {
        email: 'test@list.ru',
        name: 'Test'
      }
    };

    const actualState = userReducer(
      {
        ...initialState
      },
      loginUser.fulfilled(userTestData, '', userLogData)
    );
    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить для isAuthChecked значение false и для loginError значение ошибки при отправке loginUser.rejected', () => {
    const expectedState: TUserState = {
      ...initialState,
      loginError: 'test error'
    };

    const actualState = userReducer(
      {
        ...initialState
      },
      loginUser.rejected(new Error('test error'), '', userLogData)
    );
    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить для isAuthChecked значение false и для registerError значение null при отправке getUser.pending', () => {
    const expectedState: TUserState = {
      ...initialState,
      isAuthChecked: true
    };

    const actualState = userReducer(
      {
        ...initialState,
        loginError: 'test error'
      },
      getUser.pending('')
    );
    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить для полей user соответствующие значения при getUser.fulfilled', () => {
    const expectedState: TUserState = {
      ...initialState,
      isAuthChecked: false,
      isAuthenticated: true,
      email: 'test@list.ru',
      name: 'Test'
    };

    const userResponse: TUserResponse = {
      success: true,
      user: {
        email: 'test@list.ru',
        name: 'Test'
      }
    };

    const actualState = userReducer(
      {
        ...initialState
      },
      getUser.fulfilled(userResponse, '')
    );
    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить для isAuthChecked значение false и для registerError значение null при отправке logoutUser.pending', () => {
    const expectedState: TUserState = {
      ...initialState,
      isAuthChecked: true
    };

    const actualState = userReducer(
      {
        ...initialState
      },
      logoutUser.pending('')
    );
    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить для полей user соответствующие значения при logoutUser.fulfilled', () => {
    const expectedState: TUserState = {
      ...initialState,
      isAuthChecked: false,
      accessToken: '',
      refreshToken: '',
      email: '',
      name: ''
    };

    const userResponse: TServerResponse<{}> = {
      success: true
    };

    const actualState = userReducer(
      {
        ...initialState,
        isAuthChecked: true,
        email: 'test@list.ru',
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
        name: 'Test'
      },
      logoutUser.fulfilled(userResponse, '')
    );
    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить для isAuthChecked значение false при отправке updateUser.pending', () => {
    const expectedState: TUserState = {
      ...initialState,
      isAuthChecked: true
    };

    const actualState = userReducer(
      {
        ...initialState
      },
      updateUser.pending('', userRegData)
    );
    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить для полей user соответствующие значения при updateUser.fulfilled', () => {
    const expectedState: TUserState = {
      ...initialState,
      isAuthChecked: false,
      email: 'test1@list.ru',
      name: 'Test123'
    };

    const userResponse: TUserResponse = {
      success: true,
      user: {
        email: 'test1@list.ru',
        name: 'Test123'
      }
    };

    const updateData: TRegisterData = {
      email: 'test1@list.ru',
      name: 'Test123',
      password: '111111'
    };

    const actualState = userReducer(
      {
        ...initialState
      },
      updateUser.fulfilled(userResponse, '', updateData)
    );
    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить для isAuthChecked значение false при отправке forgotPassword.pending', () => {
    const expectedState: TUserState = {
      ...initialState,
      isAuthChecked: true
    };
    
    const actualState = userReducer(
      {
        ...initialState
      },
      forgotPassword.pending('', '')
    );
    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить для полей user соответствующие значения при forgotPassword.fulfilled', () => {
    const expectedState: TUserState = {
      ...initialState
    };

    const response: TServerResponse<{}> = {
      success: true
    };

    const actualState = userReducer(
      {
        ...initialState
      },
      forgotPassword.fulfilled(response, '', '')
    );
    expect(actualState).toEqual(expectedState);
  });
});
