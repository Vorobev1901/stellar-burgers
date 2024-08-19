import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';
import { useEffect } from 'react';
import { getCookie } from '../../utils/cookie';
import { TUser } from '@utils-types';

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  user: TUser;
};

export const ProtectedRoute = ({
  isAuthenticated,
  isAuthChecked,
  user
}: ProtectedRouteProps) => {
  if (isAuthChecked || !isAuthenticated) {
    return <Preloader />;
  }

  if (user.name === '' && user.email === '') {
    return <Navigate replace to='/login' />;
  }

  return <Outlet />;
};
