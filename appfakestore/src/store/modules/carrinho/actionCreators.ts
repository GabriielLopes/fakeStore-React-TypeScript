import * as actionsTypes from './actionTypes';
import { CarrinhoAction } from '../type';
import { ProductCart } from '../type';

export function addProduct(product: ProductCart) {
  const action: CarrinhoAction = {
    type: actionsTypes.ADD_CARRINHO,
    product,
  };
  return action;
}

export function removeProduct(product: ProductCart) {
  const action: CarrinhoAction = {
    type: actionsTypes.REMOVE_CARRINHO,
    product,
  };

  return action;
}

export function aumentarQtdeCarrinho(product: ProductCart) {
  const action: CarrinhoAction = {
    type: actionsTypes.AUMENTAR_QTDE_CARRINHO,
    product,
  };
  return action;
}

export function diminuirQtdeCarrinho(product: ProductCart) {
  const action: CarrinhoAction = {
    type: actionsTypes.DIMINUIR_QTDE_CARRINHO,
    product,
  };
  return action;
}
