import { Carrinho } from "../store/modules/type";

export default function produtoExisteNoCarrinho(cart: Carrinho, id: number): boolean {
  if (cart.products?.find((item) => item.productId === id)) return true;
  return false;
}
