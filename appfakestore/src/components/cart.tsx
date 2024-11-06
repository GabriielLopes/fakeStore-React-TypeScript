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

  console.log(productsInCart);

  return (
    <div className="container-cart">
      {productsInCart.map((produto) => (
        <>
          <div className="cart-content">
            <img src={produto.image} alt={produto.description} />
            <small>
              {produto.title}
              <br />
              <br />
              Sub total: <strong>{produto.price}</strong>
              <br />
              Qtde: <input type="number" />
            </small>
          </div>
          <hr />
        </>
      ))}
    </div>
  );
}
