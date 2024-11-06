import * as actionsTypes from './actionTypes';

export function addCarrinho(carrinho: Carrinho) {
  const action: CarrinhoAction = {
    type: actionsTypes.ADD_CARRINHO,
    carrinho,
  };

  return action;
}

export function removeCarrinho(carrinho: Carrinho) {
  const action: CarrinhoAction = {
    type: actionsTypes.REMOVE_CARRINHO,
    carrinho,
  };

  return action;
}
