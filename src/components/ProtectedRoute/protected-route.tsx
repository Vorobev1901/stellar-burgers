import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import {
  selectAuthChecked,
  selectAuthenticated,
  selectUser
} from '../../services/userSlice';

type ProtectedRouteProps = {
  anonymous: boolean;
};

export const ProtectedRoute = ({ anonymous = false }: ProtectedRouteProps) => {
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectAuthChecked);
  const isInit = useSelector(selectAuthenticated);
  const isLoggedIn = user.name !== '' && user.email !== '';

  const location = useLocation();
  const from = location.state?.from || '/';

  if (isAuthChecked || !isInit) {
    return <Preloader />;
  }

  if (anonymous && isLoggedIn) {
    // ...отправляем на предыдущую страницу
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    // ...то отправляем на страницу логин
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return <Outlet />;
};
