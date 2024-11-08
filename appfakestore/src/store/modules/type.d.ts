import { Product } from "../../interfaces/product";

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

interface FetchProductsState {
  products: Product[],
  loading: boolean,
  error: string | null,
}

interface FetchProductsAction {
  type: string,
  payload?: string | Product[]
}

type DispatchType = (args: CarrinhoAction) => CarrinhoAction;
