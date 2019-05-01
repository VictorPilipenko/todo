import { call, put, takeLatest } from 'redux-saga/effects';
import { authRef } from '../firebase';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
} from '../constants/actionTypes';

function* fetchUser(action) {
  try {
    const { email, password } = action.payload;
    const user = yield call(
      () => authRef().signInWithEmailAndPassword(email, password),
      action.payload.username,
    );
    console.log(user.user.email)
    localStorage.setItem('uid', user.user.uid);
    localStorage.setItem('email', user.user.email);
    yield put({
      type: SIGN_IN_SUCCESS,
      payload: user.user.uid,
    });
  } catch (error) {
    localStorage.removeItem('uid');
    localStorage.removeItem('email');
    yield put({
      type: SIGN_IN_FAIL,
      payload: error.message,
    });
  }
}

const signIn = [
  takeLatest(SIGN_IN_REQUEST, fetchUser),
];

export default signIn;
