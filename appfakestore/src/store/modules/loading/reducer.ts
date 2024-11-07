import * as actionsTypes from './actionTypes';

const initialState: Loading = {
  isLoading: false,
};

const reducer = (state: Loading = initialState, action: LoadingAction): Loading => {
  switch(action.type) {
    case actionsTypes.IS_LOADING: {
      const loading = state;
      loading.isLoading = true;
      return loading
    }

    case actionsTypes.NOT_LOADING: {
      const loading = state;
      loading.isLoading = false;
      return loading
    }
  }
  return state
};

export default reducer
