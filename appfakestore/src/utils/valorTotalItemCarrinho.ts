import { consultarQtdeNoCarrinho } from "./consultarQtdeNoCarrinho";
import { Product } from "../interfaces/product";
import { Carrinho } from "../store/modules/type";

export const valorTotalItemCarrinho = (produto: Product, cart: Carrinho) => {
  let result = 0;
  if (typeof produto.id === 'number' && typeof produto.price === 'number') {
    result = consultarQtdeNoCarrinho(produto.id, cart) * produto.price;
  }
  return result;
};
