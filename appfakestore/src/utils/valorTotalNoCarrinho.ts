import { Product } from '../interfaces/product';
import { consultarQtdeNoCarrinho } from './consultarQtdeNoCarrinho'


export const valorTotalNoCarrinho = (products: Product[], cart: Carrinho): number => {
  return products.reduce((acc: number, value): number => {
    if (value.price && value.id) {
      return (acc += value.price * consultarQtdeNoCarrinho(value.id, cart));
    }
    return 0;
  }, 0);
};
