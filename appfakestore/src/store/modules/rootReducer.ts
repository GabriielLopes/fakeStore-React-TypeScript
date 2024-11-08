import { combineReducers } from 'redux';

import carrinho from './carrinho/reducer';
import produtos from './produtos/reducer';

export default combineReducers({
  carrinho,
  produtos
});
