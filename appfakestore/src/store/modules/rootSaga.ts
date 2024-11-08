import { all } from 'redux-saga/effects';

import productSaga from './produtos/saga';

export default function* rootSaga() {
  yield all([productSaga]);
}
