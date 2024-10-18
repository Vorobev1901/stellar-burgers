import { TOrder } from '@utils-types';
import { getFeeds, TFeedState, reducer as feedReducer, initialState  } from '../../src/services/feedSlice';
import { TFeedsResponse } from '@api';

describe('Проверка редьюсера слайса feed', () => {

  it('Должен установить для isLoading значение true и для error значение null при отправке getFeeds.pending', () => {
    const expectedState: TFeedState = {
      ...initialState,
      isLoading: true
    };
    const actualState = feedReducer(
      {
        ...initialState,
        error: 'test error'
      },
      getFeeds.pending('')
    );
    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить для isLoading значение false и для orders значение всех заказов при отправке getFeeds.fulfilled', () => {
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

    const expectedState: TFeedState = {
      ...initialState,
      orders: orders,
      total: 56066,
      totalToday: 128
    };

    const oredersResponse: TFeedsResponse = {
      success: true,
      orders: orders,
      total: 56066,
      totalToday: 128
    };

    const actualState = feedReducer(
      {
        ...initialState,
        isLoading: true
      },
      getFeeds.fulfilled(oredersResponse, '')
    );
    expect(actualState).toEqual(expectedState);
  });

  it('Должен установить для isLoading значение false и для error значение ошибки при отправке getFeeds.rejected', () => {
    const expectedState: TFeedState = {
      ...initialState,
      error: 'test error'
    };
    const actualState = feedReducer(
      {
        ...initialState,
        isLoading: true
      },
      getFeeds.rejected(new Error('test error'), '')
    );
    expect(actualState).toEqual(expectedState);
  });
});
