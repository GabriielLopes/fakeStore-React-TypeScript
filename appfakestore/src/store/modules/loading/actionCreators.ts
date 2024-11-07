import * as actionsTypes from './actionTypes';

export function isLoading(isLoading: Loading) {
  const action: LoadingAction = {
    type: actionsTypes.IS_LOADING,
    isLoading,
  };
  return action
}

export function notLoading(isLoading: Loading) {
  const action: LoadingAction = {
    type: actionsTypes.NOT_LOADING,
    isLoading,
  };
  return action
}
