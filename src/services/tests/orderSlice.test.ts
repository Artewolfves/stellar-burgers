import {
  placeNewOrder,
  resetOrder,
  initialState,
  orderReducer as reducer
} from '../slices/orderSlice';
import { TOrder } from '../../utils/types';
import { expect, test, describe } from '@jest/globals';

describe('Тестирование экшенов заказов', () => {
  test('Тест начального состояния заказов', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});

describe('Тестирование редьюсеров для placeNewOrder', () => {
  test('Тест состояния placeNewOrder.pending', () => {
    const action = { type: placeNewOrder.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.order).toBe(null);
    expect(state.error).toBeUndefined();
  });

  test('Тест состояния placeNewOrder.fulfilled', () => {
    const mockOrder: TOrder = {
      _id: '671a8f96d829be001c7787ea',
      ingredients: [
        'Флюоресцентная булка R2-D3',
        'Флюоресцентный spicy люминесцентный бургер',
        'Филе Люминесцентного тетраодонтимформа',
        'Соус Spicy-X',
        'Флюоресцентная булка R2-D3'
      ],
      status: 'done',
      name: 'Флюоресцентный spicy люминесцентный бургер',
      createdAt: '2024-10-24T18:19:02.774Z',
      updatedAt: '2024-10-24T18:19:03.715Z',
      number: 57403
    };

    const action = {
      type: placeNewOrder.fulfilled.type,
      payload: { order: mockOrder }
    };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.order).toEqual(mockOrder);
    expect(state.error).toBeUndefined();
  });

  test('Тест состояния placeNewOrder.rejected', () => {
    const errorMessage = 'Ошибка при создании заказа';
    const action = {
      type: placeNewOrder.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.order).toBe(null);
    expect(state.error).toBe(errorMessage);
  });
});

describe('Тестирование экшена resetOrder', () => {
  test('Сброс состояния заказа', () => {
    const previousState = {
      loading: true,
      order: {
        _id: '671a8f96d829be001c7787ea',
        ingredients: [
          'Флюоресцентная булка R2-D3',
          'Флюоресцентный spicy люминесцентный бургер',
          'Филе Люминесцентного тетраодонтимформа',
          'Соус Spicy-X',
          'Флюоресцентная булка R2-D3'
        ],
        status: 'done',
        name: 'Флюоресцентный spicy люминесцентный бургер',
        createdAt: '2024-10-24T18:19:02.774Z',
        updatedAt: '2024-10-24T18:19:03.715Z',
        number: 57403
      },
      error: 'Error'
    };

    const state = reducer(previousState, resetOrder());

    expect(state).toEqual(initialState);
  });
});