import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootStore } from '../../services/store';
import { TUser } from '@utils-types';
import { selectUser } from '../../services/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector<RootStore, TUser>(selectUser);

  return (
    <>
      <AppHeaderUI userName={user?.name} />
      <Outlet />
    </>
  );
};
