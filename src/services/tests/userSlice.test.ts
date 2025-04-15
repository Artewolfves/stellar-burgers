import {
  register,
  login,
  apiGetUser,
  updateUser,
  logout,
  initialState,
  userReducer as reducer
} from '../slices/userSlice';
import { describe, expect, test } from '@jest/globals';

const mockUser = {
  email: "test@gmail.com",
  name: "Test"
};
describe('Тестирование экшенов загрузки пользователя', () => {
  test('Тест начального состояния пользователя', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});

describe('Тестирование работы редьюсеров для login', () => {
  test('Тест состояния login.pending', () => {
    const action = { type: login.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe('');
    expect(state.isAuthChecked).toBe(false);
  });

  test('Тест состояния login.rejected', () => {
    const errorMessage = 'Ошибка загрузки';
    const action = {
      type: login.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.isAuthChecked).toBe(false);
  });

  test('Тест состояния login.fulfilled', () => {
    const action = {
      type: login.fulfilled.type,
      payload: {
        user: mockUser
      }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });
});

describe('Тестирование редьюсеров для register', () => {
  test('Тест состояния register.pending', () => {
    const action = { type: register.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe('');
    expect(state.isAuthChecked).toBe(false);
  });

  test('Тест состояния register.rejected', () => {
    const errorMessage = 'Ошибка загрузки ';
    const action = {
      type: register.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.isAuthChecked).toBe(false);
  });

  test('Тест состояния register.fulfilled', () => {
    const action = {
      type: register.fulfilled.type,
      payload: {
        user: mockUser
      }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });
});

describe('Тестирование редьюсеров для logout', () => {
  test('Тест состояния logout.pending', () => {
    const action = { type: logout.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
  });
  test('Тест состояния logout.fulfilled', () => {
    const action = { type: logout.fulfilled.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.user).toEqual({ email: '', name: '' });
    expect(state.isAuthChecked).toBe(false);
  });
});

describe('Тестирование редьюсеров для updateUser', () => {
  test('Тест состояния updateUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe('');
  });

  test('Тест состояния updateUser.rejected', () => {
    const errorMessage = 'Ошибка загрузки';
    const action = {
      type: updateUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('Тест состояния updateUser.fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: {
        user: mockUser
      }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });
});

describe('Тестирование редьюсеров для apiGetUser', () => {
  test('Тест состояния apiGetUser.pending', () => {
    const action = { type: apiGetUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
  });

  test('Тест состояния apiGetUser.rejected', () => {
    const errorMessage = 'Ошибка загрузки';
    const action = {
      type: apiGetUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('Тест состояния apiGetUser.fulfilled', () => {
    const action = {
      type: apiGetUser.fulfilled.type,
      payload: {
        user: mockUser
      }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });
});