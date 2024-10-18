import { TIngredient } from '@utils-types';
import {
  getIngredients,
  TIngredientState
} from '../../src/services/ingredientSlice';
import { reducer as ingredientReducer } from '../../src/services/ingredientSlice';

describe('Проверка редьюсера слайса ingredient', () => {
  const initialState: TIngredientState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  it('Должен установить для isLoading значение true и для error значение null при отправке getIngredients.pending', () => {
    const expectedState: TIngredientState = {
      ...initialState,
      isLoading: true
    };
    const actualState = ingredientReducer(
      {
        ...initialState,
        error: 'test error'
      },
      getIngredients.pending('')
    );
    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить для isLoading значение false и для ingredients значение всех начинок при отправке getIngredients.fulfilled', () => {
    const ingredients: TIngredient[] = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      }
    ];

    const expectedState: TIngredientState = {
      ...initialState,
      ingredients: ingredients
    };

    const actualState = ingredientReducer(
      {
        ...initialState,
        isLoading: true
      },
      getIngredients.fulfilled(ingredients, '')
    );
    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить для isLoading значение false и для error значение ошибки при отправке getIngredients.rejected', () => {
    const expectedState: TIngredientState = {
      ...initialState,
      error: 'test error'
    };
    const actualState = ingredientReducer(
      {
        ...initialState,
        isLoading: true
      },
      getIngredients.rejected(new Error('test error'), '')
    );
    expect(actualState).toEqual(expectedState);
  });
});
