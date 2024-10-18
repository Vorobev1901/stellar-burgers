import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { Outlet } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);

  return (
    <>
      <AppHeaderUI userName={user?.name} />
      <Outlet />
    </>
  );
};
