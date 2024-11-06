import * as actionsTypes from './actionTypes';

const initialState: CarrinhoState = {
  carrinhos: [
    {
      id: 15,
      userId: 1,
      date: '2024-11-06',
      products: [
        {
          productId: 5,
          quantity: 3,
        },
      ],
    },
  ],
};

const reducer = (state: CarrinhoState = initialState, action: CarrinhoAction): CarrinhoState => {
  switch (action.type) {
    case actionsTypes.ADD_CARRINHO:
      const newCarrinho: Carrinho = {
        id: action.carrinho.id,
        date: action.carrinho.date,
        products: action.carrinho.products,
        userId: action.carrinho.userId,
      };
      return {
        ...state,
        carrinhos: state.carrinhos.concat(newCarrinho),
      };

    case actionsTypes.REMOVE_CARRINHO:
      const carrinhoAtualizado: Carrinho[] = state.carrinhos.filter(
        (carrinho) => carrinho.id !== action.carrinho.id,
      );
      return {
        ...state,
        carrinhos: carrinhoAtualizado,
      };
  }
  return state;
};

export default reducer;
