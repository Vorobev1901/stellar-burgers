import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrders,
  selectIsLoading,
  selectOrders
} from '../../services/orderSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(selectOrders);
  const ordersIsLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);
  3;
  if (ordersIsLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
