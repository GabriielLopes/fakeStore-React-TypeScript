import { combineReducers } from 'redux';

import carrinho from './carrinho/reducer';
import loading from './loading/reducer';
import produtos from './produtos/reducer';

export default combineReducers({
  carrinho,
  loading,
  produtos
});
