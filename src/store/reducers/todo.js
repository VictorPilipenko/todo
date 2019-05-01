import {
  GET_TODO_LIST_REQUEST,
  GET_TODO_LIST_SUCCESS,
  GET_TODO_LIST_FAIL,
  GET_TODO_LIST_FULL_REQUEST,
  GET_TODO_LIST_FULL_SUCCESS,
  GET_TODO_LIST_FULL_FAIL,
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO_STATE,
  SET_TODO_LIST_FILTER,
  EDIT_TODO,
} from '../constants/actionTypes';
import { ALL } from '../constants/filterTypes';

const initialState = {
  list: [],
  listFull: [],
  filter: ALL,
  error: '',
  isFetching: false,
};

export default function todo(state = initialState, action) {
  switch (action.type) {
    case GET_TODO_LIST_REQUEST:
      return {
        ...state,
        error: '',
        isFetching: true,
      };
    case GET_TODO_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isFetching: false,
      };
    case GET_TODO_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    case GET_TODO_LIST_FULL_REQUEST:
      return {
        ...state,
        error: '',
        isFetching: true,
      };
    case GET_TODO_LIST_FULL_SUCCESS:
      return {
        ...state,
        listFull: action.payload,
        isFetching: false,
      };
    case GET_TODO_LIST_FULL_FAIL:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    case ADD_TODO:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case EDIT_TODO:
      return {
        ...state,
      };
    case DELETE_TODO:
      return {
        ...state,
        list: state.list.filter(todoItem => todoItem.key !== action.payload),
      };
    case TOGGLE_TODO_STATE:
      return {
        ...state,
        list: state.list.map((todoItem) => {
          todoItem.completed = todoItem.key === action.payload.id
            ? !todoItem.completed
            : todoItem.completed;
          return todoItem;
        }),
      };
    case SET_TODO_LIST_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}
