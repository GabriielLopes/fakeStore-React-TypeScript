import { takeLatest, call, put } from 'redux-saga/effects';
import axios from '../../../services/axios';
import * as actionsCreatores from './actionCreatores';
import * as actionsTypes from './actionTypes';

function* fetchProductsWorkerSaga(): any {
  try {
    const response = yield call(axios.get, '/products');
    yield put(actionsCreatores.fetchProductsSuccess(response.data));
  } catch (error) {
    yield put(actionsCreatores.fetchProductsFailure(error as string))
  }
}

function* productSaga() {
  yield takeLatest(actionsTypes.FETCH_PRODUCTS_REQUEST, fetchProductsWorkerSaga);
}

export default productSaga();
