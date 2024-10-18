import { expect, test, describe } from '@jest/globals';
import {
  reducer as burgerConstructorReducer,
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  initialState as initialConstructorState
} from '../services/burgerConstructorSlice';

describe('Проверка редьюсера слайса burgerConstructor', () => {

  const fillingIngredient1 = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  };

  const fillingIngredient2 = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  };

  const bunIngredient = {
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
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  };

  test('Добавляет булку в конструктор:', () => {
    const action = addIngredient(bunIngredient);
    const state = burgerConstructorReducer(initialConstructorState, action);
    const { constructorItem } = state;
    expect(constructorItem.bun).toEqual({
      ...bunIngredient,
      id: expect.any(String)
    });
  });

  test('Добавляет начинку в конструктор:', () => {
    const action = addIngredient(fillingIngredient1);
    const state = burgerConstructorReducer(initialConstructorState, action);
    const { constructorItem } = state;
    expect(constructorItem.ingredients).toHaveLength(1);
    expect(constructorItem.ingredients[0]).toEqual({
      ...fillingIngredient1,
      id: expect.any(String)
    });
  });

  test('Удаляет начинку из конструктора:', () => {
    const stateWithIngredient = {
      ...initialConstructorState,
      constructorItem: {
        bun: null,
        ingredients: [
          {
            ...fillingIngredient1,
            id: '1'
          }
        ]
      }
    };
    const action = removeIngredient('1');
    const state = burgerConstructorReducer(stateWithIngredient, action);
    const { constructorItem } = state;
    expect(constructorItem.ingredients).toHaveLength(0);
    expect(constructorItem.ingredients).toEqual([]);
  });

  test('Перемещает начинку вниз [moveDownIngredient]:', () => {
    const stateWithIngredients = {
      ...initialConstructorState,
      constructorItem: {
        bun: null,
        ingredients: [
          {
            ...fillingIngredient1,
            id: '1'
          },
          {
            ...fillingIngredient2,
            id: '2'
          }
        ]
      }
    };
    const action = moveDownIngredient(0);
    const state = burgerConstructorReducer(stateWithIngredients, action);
    const { constructorItem } = state;
    expect(constructorItem.ingredients).toEqual([
      {
        ...fillingIngredient2,
        id: '2'
      },
      {
        ...fillingIngredient1,
        id: '1'
      }
    ]);
  });

  test('Перемещает начинку вверх [moveUpIngredient]:', () => {
    const stateWithIngredients = {
      ...initialConstructorState,
      constructorItem: {
        bun: null,
        ingredients: [
          {
            ...fillingIngredient1,
            id: '1'
          },
          {
            ...fillingIngredient2,
            id: '2'
          }
        ]
      }
    };
    const action = moveUpIngredient(1);
    const state = burgerConstructorReducer(stateWithIngredients, action);
    const { constructorItem } = state;
    expect(constructorItem.ingredients).toEqual([
      {
        ...fillingIngredient2,
        id: '2'
      },
      {
        ...fillingIngredient1,
        id: '1'
      }
    ]);
  });
});
