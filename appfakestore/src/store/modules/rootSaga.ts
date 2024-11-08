import { all } from 'redux-saga/effects';

import produtos from './produtos/saga';

export default function* rootSaga() {
  yield all([produtos]);
}
