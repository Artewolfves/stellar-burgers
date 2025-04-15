import { expect, test, describe } from '@jest/globals';
import {
  getIngredients,
  ingredientReduce as reducer,
  initialState
} from '../slices/ingredientsSlice';

const mockIngredients = {
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa0941',
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
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    }
  ],
  loading: false,
  error: null
};

describe('Тестирование работы редьюсеров для ingredientsSlice', () => {
  test('Тест начального состояния ингредиентов', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('Тест состояния getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('Тест состояния getIngredients.rejected', () => {
    const errorMessage = 'Ошибка загрузки';
    const action = {
      type: getIngredients.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('Тест состояния getIngredients.fulfilled', () => {
    const mock = mockIngredients.ingredients;
    const action = getIngredients.fulfilled(mock, '');
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.ingredients).toEqual(mock);
  });
});
