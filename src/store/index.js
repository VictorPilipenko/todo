import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducer';
import rootSaga from './sagas/rootSaga';

const saga = createSagaMiddleware();

const middleware = applyMiddleware(
  saga,
);

const store = createStore(
  rootReducer,
  middleware,
);

saga.run(rootSaga);
export default store;
