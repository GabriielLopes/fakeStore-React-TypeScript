import * as actionsTypes from './actionTypes';
import { Carrinho } from '../type';
import { CarrinhoAction } from '../type';

const dataAtual = new Date();
const initialState: Carrinho = {
  date: dataAtual.toISOString(),
  userId: 1,
  id: 1,
  products: [{
    productId: 0,
    quantity: 0
  }],
};

const reducer = (state: Carrinho = initialState, action: CarrinhoAction): Carrinho => {
  switch (action.type) {
    case actionsTypes.ADD_CARRINHO: {
      const newCarrinho = state;
      if (newCarrinho) {
        newCarrinho.products?.push({
          productId: action.product.productId,
          quantity: 1,
        });
      }
      const products = newCarrinho.products;
      return {
        ...state,
        products,
      };
    }

    case actionsTypes.REMOVE_CARRINHO: {
      const newCarrinho = state;
      const productIndex = newCarrinho.products?.findIndex(
        (product) => product.productId === action.product.productId,
      );
      if (typeof productIndex === 'number') {
        newCarrinho.products?.splice(productIndex, 1);
      }
      return {
        ...state,
      };
    }

    case actionsTypes.AUMENTAR_QTDE_CARRINHO: {
      const newCarrinho = state;
      const productIndex = newCarrinho.products?.findIndex(
        (product) => product.productId === action.product.productId,
      );
      if (newCarrinho.products && typeof productIndex === 'number') {
        newCarrinho.products[productIndex].quantity =
          (newCarrinho.products[productIndex].quantity as number) + 1;
      }

      return {
        ...state,
        products: newCarrinho.products,
      };
    }

    case actionsTypes.DIMINUIR_QTDE_CARRINHO: {
      const newCarrinho = state;
      const productIndex = newCarrinho.products?.findIndex(
        (product) => product.productId === action.product.productId,
      );
      if (newCarrinho.products && typeof productIndex === 'number') {
        newCarrinho.products[productIndex].quantity =
          (newCarrinho.products[productIndex].quantity as number) - 1;
      }

      return {
        ...state,
        products: newCarrinho.products,
      };
    }
  }
  return state;
};

export default reducer;
