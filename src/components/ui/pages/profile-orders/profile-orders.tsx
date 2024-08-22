import { FC } from 'react';

import styles from './profile-orders.module.css';

import { ProfileOrdersUIProps } from './type';
import { ProfileMenu, OrdersList } from '@components';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({ orders }) => (
  <main className={`${styles.main}`}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>
    <div className={`mt-30 ${styles.orders}`}>
      {orders.length === 0 ? (
        <p className={`ml-30 text text_type_main-default pt-4`}>
          У вас пока нет заказов
        </p>
      ) : (
        <OrdersList orders={orders} />
      )}
    </div>
  </main>
);
