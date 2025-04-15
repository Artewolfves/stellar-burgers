import {
  getUserOrders,
  userOrders,
  initialState
} from '../slices/orderListSlice';
import { expect, test, describe } from '@jest/globals';

describe('Тестирование экшенов списка заказов', () => {
  test('Тест начального состояния списка заказов', () => {
    expect(userOrders.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});

describe('Тестирование редьюсеров для getUserOrders', () => {
  test('Тест состояния getUserOrders.pending', () => {
    const action = { type: getUserOrders.pending.type };
    const state = userOrders.reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.orders).toEqual([]);
  });

  test('Тест состояния getUserOrders.fulfilled', () => {
    const mockOrders = [
      {
        _id: '66e9f8b2119d45001b507802',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0946',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный spicy био-марсианский минеральный бургер',
        createdAt: '2024-09-17T21:46:26.339Z',
        updatedAt: '2024-09-17T21:46:26.815Z',
        number: 53260
      }
    ];

    const pendingState = userOrders.reducer(initialState, { type: getUserOrders.pending.type });
    const action = { type: getUserOrders.fulfilled.type, payload: mockOrders };
    const state = userOrders.reducer(pendingState, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  test('Тест состояния getUserOrders.rejected', () => {
    const errorMessage = 'Ошибка при получении заказов';
    const pendingState = userOrders.reducer(initialState, { type: getUserOrders.pending.type });
    const action = {
      type: getUserOrders.rejected.type,
      error: { message: errorMessage }
    };
    const state = userOrders.reducer(pendingState, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual([]);
  });
});