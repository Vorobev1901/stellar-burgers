import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  registerUser,
  selectAuthChecked,
  selectAuthenticated,
  selectRegisterError,
  selectUser
} from '../../services/userSlice';
import { Navigate } from 'react-router-dom';
import { Preloader } from '@ui';
import { TUser } from '@utils-types';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectAuthenticated);
  const isAuthChecked = useSelector(selectAuthChecked);
  const user = useSelector(selectUser);
  const errorText = useSelector(selectRegisterError);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ email, name: userName, password }));
  };

  if (isAuthChecked || !isAuthenticated) {
    return <Preloader />;
  }

  if (user.name !== '' && user.email !== '') {
    return <Navigate replace to='/' />;
  }

  return (
    <RegisterUI
      errorText={errorText ? errorText : undefined}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
