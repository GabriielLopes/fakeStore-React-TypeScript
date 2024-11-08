import { Product } from '../../../interfaces/product';
import { FetchProductsAction, FetchProductsState } from '../type';
import * as actionsTypes from './actionTypes';

const initialState: FetchProductsState = {
  products: [],
  error: null,
  loading: false,
};

const reducer = (
  state: FetchProductsState = initialState,
  action: FetchProductsAction,
): FetchProductsState => {
  switch (action.type) {
    case actionsTypes.FETCH_PRODUCTS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case actionsTypes.FETCH_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        products: action.payload as Product[],
      };
    }

    case actionsTypes.FETCH_PRODUCTS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
