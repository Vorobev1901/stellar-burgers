import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootStore } from '../../services/store';
import {
  getOrders,
  selectIsLoading,
  selectOrders
} from '../../services/orderSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector<RootStore, TOrder[]>(selectOrders);
  const ordersIsLoading = useSelector<RootStore, boolean>(selectIsLoading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getOrders());
  }, []);
  3;
  if (ordersIsLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
