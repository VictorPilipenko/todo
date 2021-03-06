import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { database } from '../firebase';
import snapshotToArray from '../utils/snapshotToArray';
import {
  GET_TODO_LIST_REQUEST,
  GET_TODO_LIST_SUCCESS,
  GET_TODO_LIST_FAIL,

  GET_TODO_LIST_FULL_REQUEST,
  GET_TODO_LIST_FULL_SUCCESS,
  GET_TODO_LIST_FULL_FAIL,
} from '../constants/actionTypes';

function* fetchTodoList() {
  try {
    const uid = localStorage.getItem('uid');
    const todoList = yield call(
      () => (database.ref(`/users/${uid}/todolist`).once('value')
        .then(snapshot => {
          console.log(snapshot.val())
          return snapshot.val()
        })),
      null,
    );

    yield put({
      type: GET_TODO_LIST_SUCCESS,
      payload: snapshotToArray(todoList).sort((a, b) => a.created_at - b.created_at),
    });
  } catch (error) {
    yield put({
      type: GET_TODO_LIST_FAIL,
      payload: error.message,
    });
  }
}

function* fetchTodoListFull() {
  try {

    const todoListFull = yield call(
      () => (database.ref(`users`).once("value")
        .then(snapshot => {
          console.log(snapshot.val())
          return snapshot.val()
        })),
      null,
    );

    yield put({
      type: GET_TODO_LIST_FULL_SUCCESS,
      payload: todoListFull,
    });
  } catch (error) {
    yield put({
      type: GET_TODO_LIST_FULL_FAIL,
      payload: error.message,
    });
  }
}

const todoList = [
  takeLatest(GET_TODO_LIST_REQUEST, fetchTodoList),
  takeLatest(GET_TODO_LIST_FULL_REQUEST, fetchTodoListFull),
];

export default todoList;
