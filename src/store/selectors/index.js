import { createSelector } from 'reselect';
import { ALL, ACTIVE, COMPLETED } from '../constants/filterTypes';

const getTodoList = store => store.todo.list;

const getFilterType = store => store.todo.filter;

const getAuth = store => store.user.auth;

const getUserFetching = store => store.user.isFetching;

const getTodoFetching = store => store.todo.isFetching;

const getError = store => store.user.error;

export const getTodoFetchingState = createSelector(
  [getTodoFetching],
  fetching => fetching,
);

export const getFilteredTodoList = createSelector(
  [getFilterType, getTodoList],
  (filter, list) => {
    switch (filter) {
      case ALL:
        return list;
      case ACTIVE:
        return list.filter(todo => !todo.completed);
      case COMPLETED:
        return list.filter(todo => todo.completed);
      default:
        return list;
    }
  },
);

export const getAuthState = createSelector(
  [getAuth],
  authState => authState,
);

export const getUserFetchingState = createSelector(
  [getUserFetching],
  fetchingState => fetchingState,
);

export const getFilterState = createSelector(
  [getFilterType],
  filter => filter,
);

export const getUserError = createSelector(
  [getError],
  error => error,
);
