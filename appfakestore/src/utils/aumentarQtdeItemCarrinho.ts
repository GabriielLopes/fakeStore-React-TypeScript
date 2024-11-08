import { ProductCart } from "../store/modules/type";
import * as actionsCreators from '../store/modules/carrinho/actionCreators'
import { Dispatch } from "redux";

export default function aumentarQtdeItemCarrinho (product: ProductCart, dispatch: Dispatch): void  {
    if (!product) return;
    dispatch(actionsCreators.aumentarQtdeCarrinho(product))
  };
