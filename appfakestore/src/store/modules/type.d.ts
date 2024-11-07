interface Carrinho {
  id: number;
  userId: number;
  date: string;
  products?: [
    {
      productId: number | undefined;
      quantity: number | undefined;
    },
  ];
}

type ProductCart = {
  productId: number;
  quantity: number;
}

interface CarrinhoState  {
  carrinhos: Carrinho[]
};

type CarrinhoAction = {
  type: string;
  product: ProductCart,
};

type Loading = {
  isLoading: boolean;
}

interface LoadingAction {
  type: string,
  isLoading: Loading,
}

type DispatchType = (args: CarrinhoAction) => CarrinhoAction;
