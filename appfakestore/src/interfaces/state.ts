import { Carrinho, FetchProductsState } from "../store/modules/type";

export interface State {
  carrinho: Carrinho;
  loading: boolean;
  produtos: FetchProductsState;
  _persist: {
    rehydrated: boolean;
    version: number;
  };
}
