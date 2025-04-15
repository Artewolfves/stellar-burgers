import { expect, test, describe } from '@jest/globals';
import {
  feedReduce as reducer, 
  initialState, 
  getAllFeeds 
} from '../slices/feedSlice';

const mockFeed = {
  orders: [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      number: 64471,
      name: 'Краторная булка N-200i',
      status: 'done',
      updatedAt: '2024-12-26T19:03:33.179Z',
      createdAt: '2024-12-26T19:03:33.179Z',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093c'
      ]
    }
  ],
  total: 100,
  totalToday: 10
};

describe('Тестирование работы редьюсеров слайса feedSlice', () => {
  test('Тест обработка начального состояния заказов', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('Тест обработка состояния getAllFeeds.pending', () => {
    const action = { type: getAllFeeds.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  test('Тест обработка состояния getAllFeeds.rejected', () => {
    const errorMessage = 'Ошибка загрузки';
    const action = {
      type: getAllFeeds.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('Тест обработка состояния getAllFeeds.fulfilled', () => {
    const action = { type: getAllFeeds.fulfilled.type, payload: mockFeed };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeUndefined();
    expect(state.orders).toEqual(mockFeed.orders);
  });
});

