import { Product } from "../interfaces/product";
import produtoExisteNoCarrinho from "./produtoExisteNoCarrinho";
import aumentarQtdeItemCarrinho from "./aumentarQtdeItemCarrinho";
import Swal from "sweetalert2";
import { Dispatch } from "redux";
import * as actionsTypes from '../store/modules/carrinho/actionCreators';
import { Carrinho } from "../store/modules/type";

export const addItemCarrinho = (product: Product, dispatch: Dispatch, cart: Carrinho): void => {
  if (!product) return;
  if (produtoExisteNoCarrinho(cart, product.id as number)) {
    if (typeof product.id !== 'number') return;
    aumentarQtdeItemCarrinho({ productId: product.id, quantity: 1 }, dispatch);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      heightAuto: true,
      title: 'Added another quantity to the cart.',
      showConfirmButton: false,
      timer: 800,
    });
    return;
  }
  dispatch(
    actionsTypes.addProduct({
      productId: product.id ?? 0,
      quantity: 1,
    }),
  );
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Product added to cart',
    showConfirmButton: false,
    timer: 1500,
  });
};
