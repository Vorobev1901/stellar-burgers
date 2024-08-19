import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404,
  ForgotPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootStore } from '../../services/store';
import { useEffect, useState } from 'react';
import {
  getUser,
  init,
  selectAuthChecked,
  selectAuthenticated,
  selectUser
} from '../../services/userSlice';
import { getCookie } from '../../utils/cookie';
import { Preloader } from '@ui';
import { ProtectedRoute } from '../ProtectedRoute';
import { getIngredients } from '../../services/ingredientSlice';
import { getFeeds } from '../../services/feedSlice';
import { getOrders } from '../../services/orderSlice';
import { TUser } from '@utils-types';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthChecked = useSelector<RootStore, boolean>(selectAuthChecked);
  const isAuthenticated = useSelector<RootStore, boolean>(selectAuthenticated);
  const user = useSelector<RootStore, TUser>(selectUser);

  const location = useLocation();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    const accessToken = getCookie('accessToken');

    if (accessToken) {
      dispatch(getUser());
    } else {
      dispatch(init());
    }
    dispatch(getIngredients());
  }, []);

  return (
    <div className={styles.app}>
      {isAuthChecked || !isAuthenticated ? (
        <Preloader />
      ) : (
        <>
          <Routes location={backgroundLocation || location}>
            <Route path='*' element={<NotFound404 />} />
            <Route path='/' element={<AppHeader />}>
              <Route index element={<ConstructorPage />} />
              <Route
                path='ingredients/:ingredientId'
                element={<IngredientDetails />}
              />
              <Route path='feed'>
                <Route index element={<Feed />} />
                <Route path=':orderNumber' element={<OrderInfo />} />
              </Route>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='reset-password' element={<ResetPassword />} />
              <Route path='forgot-password' element={<ForgotPassword />} />
              <Route
                path='profile'
                element={
                  <ProtectedRoute
                    isAuthChecked={isAuthChecked}
                    isAuthenticated={isAuthenticated}
                    user={user}
                  />
                }
              >
                <Route index element={<Profile />} />
                <Route path='orders'>
                  <Route index element={<ProfileOrders />} />
                  <Route path=':orderNumber' element={<OrderInfo />} />
                </Route>
              </Route>
            </Route>
          </Routes>

          {backgroundLocation && (
            <Routes>
              <Route
                path='/ingredients/:ingredientId'
                element={
                  <Modal title={'Детали ингредиента'}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path='/feed/:orderNumber'
                element={
                  <Modal title={'Детали заказа'}>
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path='/profile/orders/:orderNumber'
                element={
                  <Modal title={'Детали заказа'}>
                    <OrderInfo />
                  </Modal>
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export default App;
