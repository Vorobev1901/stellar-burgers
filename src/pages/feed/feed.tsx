import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFeeds,
  selectIsLoading,
  selectOrders
} from '../../services/feedSlice';
import { AppDispatch, RootStore } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector<RootStore, TOrder[]>(selectOrders);
  const feedsIsLoading = useSelector<RootStore, boolean>(selectIsLoading);

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  const handleGetFeeds = () => dispatch(getFeeds());

  if (!orders.length || feedsIsLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
