interface Carrinho {
  id: number;
  userId: number;
  date: string;
  products: [
    {
      productId: number;
      quantity: number;
    },
  ];
}

type CarrinhoState = {
  carrinhos: Carrinho[];
};

type CarrinhoAction = {
  type: string;
  carrinho: Carrinho;
};

type DispatchType = (args: CarrinhoAction) => CarrinhoAction;
