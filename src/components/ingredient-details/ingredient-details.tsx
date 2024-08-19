import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import { RootStore } from '../../services/store';
import { selectIngredientById } from '../../services/ingredientSlice';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { ingredientId } = useParams<string>();
  const ingredientData = useSelector<RootStore, TIngredient | undefined>(
    (state) => selectIngredientById(state, ingredientId)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
