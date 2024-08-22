import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <BurgerIcon type={'primary'} />
          <Link
            to='/'
            className={clsx(
              useLocation().pathname === '/' && styles.link_active,
              styles.link,
              'text text_type_main-default ml-2 mr-10'
            )}
          >
            Конструктор
          </Link>
        </>
        <>
          <ListIcon type={'primary'} />
          <Link
            to='/feed'
            className={clsx(
              useLocation().pathname.includes('/feed') && styles.link_active,
              styles.link,
              'text text_type_main-default ml-2'
            )}
          >
            Лента заказов
          </Link>
        </>
      </div>
      <Link to='/' className={styles.logo}>
        <Logo className='' />
      </Link>
      <div className={styles.link_position_last}>
        <ProfileIcon type={'primary'} />
        <Link
          to='/profile'
          className={clsx(
            useLocation().pathname.includes('/profile') && styles.link_active,
            styles.link,
            'text text_type_main-default ml-2'
          )}
        >
          {userName || 'Личный кабинет'}
        </Link>
      </div>
    </nav>
  </header>
);
