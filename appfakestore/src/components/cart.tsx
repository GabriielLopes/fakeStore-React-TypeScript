import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

import '../styles/cart.css';
import { State } from '../interfaces/state';
import axios from '../services/axios';
import { Product } from '../interfaces/product';
import { aumentarQtdeCarrinho, removeProduct } from '../store/modules/carrinho/actionCreators';
import { consultarQtdeNoCarrinho } from '../utils/consultarQtdeNoCarrinho';
import { valorTotalNoCarrinho } from '../utils/valorTotalNoCarrinho';

export function Cart() {
  const dispatch: Dispatch<any> = useDispatch();

  const cart = useSelector<State>((state) => state.carrinho) as Carrinho;
  const idsProductsInCart = cart.products?.map((productsInCart) => productsInCart.productId);

  const [productsInCart, setProductsInCart] = useState<Product[]>([]);


  useEffect(() => {
    async function getData() {
      const response = await axios.get('/products');
      const productsList: Product[] = response.data;

      setProductsInCart(productsList.filter((produto) => idsProductsInCart?.includes(produto.id)));
    }
    getData();
  }, [idsProductsInCart]);

  const handleDelete = (product: ProductCart): void => {
    if (!product) return;
    dispatch(removeProduct(product));
  };

  const aumentarQtdCarrinho = (product: ProductCart): void => {
    if (!product) return;
    dispatch(aumentarQtdeCarrinho(product));
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
              <br />
              <strong>{produto.price}</strong>
              <br />
              <div className="buttons-controls-cart">
                <button>
                  <i className="bx bx-minus" />
                </button>
                <p>{produto ? consultarQtdeNoCarrinho(produto.id, cart) : ''}</p>
                <button
                  onClick={() =>
                    aumentarQtdCarrinho({
                      productId: produto.id as number,
                      quantity: 1,
                    })
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
          <strong>R$ {valorTotalNoCarrinho(productsInCart, cart).toFixed(2)}</strong>
          <br />
          <button className="btn finalizar-compra">Finalizar compra</button>
        </div>
      </div>
    </div>
  );
}
