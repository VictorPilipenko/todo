import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers/rootReducer';
import rootSaga from './sagas/rootSaga';

export const history = createBrowserHistory();
const saga = createSagaMiddleware();

const middleware = applyMiddleware(
  routerMiddleware(history),
  saga,
);

const store = createStore(
  rootReducer,
  middleware,
);

saga.run(rootSaga);
export default store;
