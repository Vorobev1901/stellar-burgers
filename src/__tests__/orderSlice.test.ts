import { TOrder } from '@utils-types';
import { getOrders, getOrderByNumber, TOrderState, initialState, reducer as orderReducer } from '../../src/services/orderSlice';
import { TOrderResponse } from '@api';

describe('Проверка редьюсера слайса order', () => {
  const testOrder: TOrder = {
    _id: '670ccd77d829be001c7762ec',
    ingredients: [
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный space био-марсианский люминесцентный бургер',
    createdAt: '2024-10-14T07:51:19.729Z',
    updatedAt: '2024-10-14T07:51:20.613Z',
    number: 56440
  };

  it('Должен установить для isLoading значение true и для error значение null при отправке getOrders.pending', () => {
    const expectedState: TOrderState = {
      ...initialState,
      isLoading: true
    };
    const actualState = orderReducer(
      {
        ...initialState,
        error: 'test error'
      },
      getOrders.pending('')
    );
    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить для isLoading значение false и для orders значение всех заказов при отправке getOrders.fulfilled', () => {
    const orders: Array<TOrder> = [
      {
        _id: '670ccd77d829be001c7762ec',
        ingredients: [
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный space био-марсианский люминесцентный бургер',
        createdAt: '2024-10-14T07:51:19.729Z',
        updatedAt: '2024-10-14T07:51:20.613Z',
        number: 56440
      },
      {
        _id: '670ccc7dd829be001c7762e7',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093f',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Антарианский краторный бессмертный spicy био-марсианский бургер',
        createdAt: '2024-10-14T07:47:09.950Z',
        updatedAt: '2024-10-14T07:47:10.727Z',
        number: 56439
      },
      {
        _id: '670ccc6ad829be001c7762e6',
        ingredients: [
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный метеоритный бургер',
        createdAt: '2024-10-14T07:46:50.831Z',
        updatedAt: '2024-10-14T07:46:51.703Z',
        number: 56438
      }
    ];

    const expectedState: TOrderState = {
      ...initialState,
      orders: orders
    };

    const actualState = orderReducer(
      {
        ...initialState,
        isLoading: true
      },
      getOrders.fulfilled(orders, '')
    );

    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить для isLoading значение false и для error значение ошибки при отправке getOrders.rejected', () => {
    const expectedState: TOrderState = {
      ...initialState,
      error: 'test error'
    };
    const actualState = orderReducer(
      {
        ...initialState,
        isLoading: true
      },
      getOrders.rejected(new Error('test error'), '')
    );
    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить orderOnView значение null при отправке getOrderByNumber.pending', () => {
    const expectedState: TOrderState = {
      ...initialState
    };
    const actualState = orderReducer(
      {
        ...initialState,
        orderOnView: testOrder
      },
      getOrderByNumber.pending('', testOrder.number)
    );
    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить для isLoading значение false и для orderOnView значение выбранного заказа при отправке getOrderByNumber.fulfilled', () => {
    const orders: Array<TOrder> = [
      {
        _id: '670ccd77d829be001c7762ec',
        ingredients: [
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный space био-марсианский люминесцентный бургер',
        createdAt: '2024-10-14T07:51:19.729Z',
        updatedAt: '2024-10-14T07:51:20.613Z',
        number: 56440
      },
      {
        _id: '670ccc7dd829be001c7762e7',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093f',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Антарианский краторный бессмертный spicy био-марсианский бургер',
        createdAt: '2024-10-14T07:47:09.950Z',
        updatedAt: '2024-10-14T07:47:10.727Z',
        number: 56439
      },
      {
        _id: '670ccc6ad829be001c7762e6',
        ingredients: [
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный метеоритный бургер',
        createdAt: '2024-10-14T07:46:50.831Z',
        updatedAt: '2024-10-14T07:46:51.703Z',
        number: 56438
      }
    ];

    const expectedState: TOrderState = {
      ...initialState,
      orders: orders,
      orderOnView: orders[0]
    };

    const orderResponse: TOrderResponse = {
      success: true,
      orders: orders
    };

    const actualState = orderReducer(
      {
        ...initialState,
        orders: orders
      },
      getOrderByNumber.fulfilled(orderResponse, '', orders[0].number)
    );
    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить error значение ошибки при отправке getOrderByNumber.rejected', () => {
    const expectedState: TOrderState = {
      ...initialState,
      error: 'test error'
    };

    const actualState = orderReducer(
      {
        ...initialState
      },
      getOrderByNumber.rejected(new Error('test error'), '', 56440)
    );
    expect(actualState).toEqual(expectedState);
  });
});
