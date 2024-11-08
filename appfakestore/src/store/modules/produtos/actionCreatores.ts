import { Product } from '../../../interfaces/product';
import { FetchProductsAction } from '../type';
import * as actionsTypes from './actionTypes';

export function fetchProductsRequest() {
  const action: FetchProductsAction = {
    type: actionsTypes.FETCH_PRODUCTS_REQUEST,
  };
  return action;
}

export function fetchProductsSuccess(products: Product[]) {
  const action: FetchProductsAction = {
    type: actionsTypes.FETCH_PRODUCTS_SUCCESS,
    payload: products,
  };
  return action;
}

export function fetchProductsFailure(error: string) {
  const action: FetchProductsAction = {
    type: actionsTypes.FETCH_PRODUCTS_FAILURE,
    payload: error,
  };
  return action;
}
