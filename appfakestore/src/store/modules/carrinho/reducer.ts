import * as actionsTypes from './actionTypes';

const initialState: Carrinho = {
  date: '2024-06-11',
  userId: 0,
  id: 1,
  products: [
    {
      productId: 12,
      quantity: 2,
    },
  ],
};


const reducer = (state: Carrinho = initialState, action: CarrinhoAction): Carrinho => {
  switch (action.type) {
    case actionsTypes.ADD_CARRINHO:
      const newCarrinho = state;
      if (newCarrinho) {
        newCarrinho.products?.push({
          productId: action.product.productId,
          quantity: 1
        });
      }
      const products = newCarrinho.products;
      console.log(action)
      return {
        ...state,
        products,
      };

    /*
    case actionsTypes.REMOVE_CARRINHO:
      const carrinhoAtualizado: Carrinho[] = state.carrinhos.filter(
        (carrinho) => carrinho.id !== action.carrinho.id,
      );
      return {
        ...state,
        carrinhos: carrinhoAtualizado,
      };*/
  }
  return state;
};

export default reducer;
