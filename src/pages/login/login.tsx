import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useSelector, useDispatch } from '../../services/store';
import {
  loginUser,
  selectAuthChecked,
  selectAuthenticated,
  selectLoginError
} from '../../services/userSlice';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector(selectAuthChecked);
  const isInit = useSelector(selectAuthenticated);
  const errorText = useSelector(selectLoginError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (email && password) dispatch(loginUser({ email, password }));
  };

  if (isAuthChecked || !isInit) {
    return <Preloader />;
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
