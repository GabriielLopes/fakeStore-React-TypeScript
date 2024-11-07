import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import '../styles/cart.css';
import { State } from '../interfaces/state';
import axios from '../services/axios';
import { Product } from '../interfaces/product';

export function Cart() {
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

  return (
    <div className="container-cart visible">
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
                <p>1</p>
                <button>
                  <i className="bx bx-plus" />
                </button>
              </div>
            </small>
          </div>
          <hr />
        </>
      ))}

      <div className="subtotal-cart">
        <div className="subtotal-cart-content">
          <strong>R$ 1.500,00</strong>
          <br />
          <button className="btn finalizar-compra">Finalizar compra</button>
        </div>
      </div>
    </div>
  );
}
