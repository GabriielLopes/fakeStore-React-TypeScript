import { combineReducers } from 'redux';

import carrinho from './carrinho/reducer';
import loading from './loading/reducer';

export default combineReducers({
  carrinho,
  loading,
});
