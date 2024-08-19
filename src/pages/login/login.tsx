import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootStore } from '../../services/store';
import {
  loginUser,
  selectAuthChecked,
  selectAuthenticated,
  selectLoginError,
  selectUser
} from '../../services/userSlice';
import { Navigate } from 'react-router-dom';
import { Preloader } from '@ui';
import { TUser } from '@utils-types';

export const Login: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthChecked = useSelector<RootStore, boolean>(selectAuthChecked);
  const isAuthenticated = useSelector<RootStore, boolean>(selectAuthenticated);
  const user = useSelector<RootStore, TUser>(selectUser);
  const errorText = useSelector<RootStore, string | null>(selectLoginError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (email && password) dispatch(loginUser({ email, password }));
  };

  if (isAuthChecked || !isAuthenticated) {
    return <Preloader />;
  }

  if (user.name !== '' && user.email !== '') {
    return <Navigate replace to='/' />;
  }

  return (
    <LoginUI
      errorText={errorText ? errorText : undefined}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
