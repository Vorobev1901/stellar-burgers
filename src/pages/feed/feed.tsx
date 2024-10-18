import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeeds,
  selectIsLoading,
  selectOrders
} from '../../services/feedSlice';
import { AppDispatch, RootStore } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const feedsIsLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  const handleGetFeeds = () => dispatch(getFeeds());

  if (!orders.length || feedsIsLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
