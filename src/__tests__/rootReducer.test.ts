import { rootReducer } from '../services/store';
import { reducer as ingredientsReducer } from '../services/ingredientSlice';
import { reducer as constructorReducer } from '../services/burgerConstructorSlice';
import { reducer as orderReducer } from '../services/orderSlice';
import { reducer as feedReducer } from '../services/feedSlice';
import { reducer as userReducer } from '../services/userSlice';

describe('Тесты rootReducer', () => {
  test('Проверка инциализации rootReducer:', () => {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);
    expect(state).toEqual({
      burgerConstructor: constructorReducer(undefined, initAction),
      feeds: feedReducer(undefined, initAction),
      ingredients: ingredientsReducer(undefined, initAction),
      orders: orderReducer(undefined, initAction),
      user: userReducer(undefined, initAction)
    });
  });
});
