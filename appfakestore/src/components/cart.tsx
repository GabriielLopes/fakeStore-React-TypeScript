import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

import '../styles/cart.css';
import { State } from '../interfaces/state';
import { Product } from '../interfaces/product';
import {
  diminuirQtdeCarrinho,
  removeProduct,
} from '../store/modules/carrinho/actionCreators';
import { valorTotalNoCarrinho } from '../utils/valorTotalNoCarrinho';
import { Carrinho, FetchProductsState } from '../store/modules/type';
import { ProductCart } from '../store/modules/type';
import { fetchProductsRequest } from '../store/modules/produtos/actionCreatores';
import { consultarQtdeNoCarrinho } from '../utils/consultarQtdeNoCarrinho';
import aumentarQtdCarrinho from '../utils/aumentarQtdeItemCarrinho';
import { formatarValor } from '../utils/formatarValor';
import { valorTotalItemCarrinho } from '../utils/valorTotalItemCarrinho';
import AvaliacaoProduto from './AvaliacaoProduto';
import { Rating } from '../interfaces/ratingProducts';

export function Cart() {
  const dispatch: Dispatch<any> = useDispatch();
  const cart = useSelector<State>((state) => state.carrinho) as Carrinho;
  const productsList = useSelector<State>((state) => state.produtos) as FetchProductsState;

  const [productsInCart, setProductsInCart] = useState<Product[]>([]);

  useEffect(() => {
    if (productsList.products.length > 0) return;
    dispatch(fetchProductsRequest());
  }, [dispatch, productsList.products.length]);

  useEffect(() => {
    setProductsInCart(
      productsList.products.filter((produto) => {
        const quantityInCart = cart.products?.find(
          (item) => item.productId === produto.id,
        )?.quantity;
        return quantityInCart && quantityInCart > 0;
      }),
    );
  }, [cart, productsList]);

  const handleDelete = (product: ProductCart): void => {
    if (!product) return;
    dispatch(removeProduct(product));
  };

  const diminuirQtdCarrinho = (product: ProductCart): void => {
    if (!product) return;
    if (consultarQtdeNoCarrinho(product.productId, cart) === 1) return;
    dispatch(diminuirQtdeCarrinho(product));
  };

  return (
    <div className="container-cart">
      {productsInCart.length <= 0 ? <h3>Seu carrinho está vazio!</h3> : ''}
      {productsInCart.map((produto) => (
        <>
          <div className="cart-content">
            <a href={'/product/' + produto.id}>
              <img src={produto.image} alt={produto.description} />
            </a>
            <small>
              {produto.title}
              <br />
              {produto.rating ? AvaliacaoProduto(produto.rating as Rating) : ""}
              <br />
              <strong>{formatarValor.format(valorTotalItemCarrinho(produto, cart))}</strong>
              <br />
              <div className="buttons-controls-cart">
                <button
                  disabled={consultarQtdeNoCarrinho(produto.id, cart) === 1}
                  onClick={() => {
                    diminuirQtdCarrinho({
                      productId: produto.id as number,
                      quantity: 1,
                    });
                  }}
                >
                  <i className="bx bx-minus" />
                </button>
                <p>{produto ? consultarQtdeNoCarrinho(produto.id, cart) : ''}</p>
                <button
                  onClick={() =>
                    aumentarQtdCarrinho({
                      productId: produto.id as number,
                      quantity: 1,
                    },dispatch)
                  }
                >
                  <i className="bx bx-plus" />
                </button>
                <button
                  onClick={() =>
                    handleDelete({
                      productId: produto.id as number,
                      quantity: 1,
                    })
                  }
                  className="btn-delete"
                >
                  <i className="bx bxs-trash" />
                </button>
              </div>
            </small>
          </div>
          <hr />
        </>
      ))}

      <div className="subtotal-cart">
        <div className="subtotal-cart-content">
          <strong>{formatarValor.format(valorTotalNoCarrinho(productsInCart, cart))}</strong>
          <br />
          <button className="btn finalizar-compra">Finalizar compra</button>
        </div>
      </div>
    </div>
  );
}
