import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectConstructorItem,
  selectOrderRequest,
  selectOderModalData,
  newOrder,
  clearConstructor
} from '../../services/burgerConstructorSlice';
import { selectUser } from '../../services/userSlice';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../../services/orderSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selectConstructorItem);

  const orderRequest = useSelector(selectOrderRequest);

  const orderModalData = useSelector(selectOderModalData);

  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const ids = constructorItems.ingredients.map(
      (ingredient: TIngredient) => ingredient._id
    );
    ids.push(constructorItems.bun._id);
    if (user.name === '') {
      navigate('/login');
    } else {
      dispatch(newOrder(ids));
      dispatch(getOrders());
    }
  };
  const closeOrderModal = () => {
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum: number, ingredient: TIngredient) => sum + ingredient.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
