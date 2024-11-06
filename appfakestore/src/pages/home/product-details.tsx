import React, { useEffect, useState } from 'react';
import { Product } from '../../interfaces/product';
import axios from '../../services/axios';
import { useParams } from 'react-router-dom';

import '../../styles/product-details.css';

export default function ProductDetails() {
  const [produto, setProduto] = useState<Product>({});
  const [produtos, setProdutos] = useState<Product[]>([]);
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/products/${id}`);
      console.log(response.data);
      setProduto(response.data);
    }
    getData();
  }, [id]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get('/products?limit=4');
      setProdutos(response.data);
    }
    getData();
  }, []);

  return (
    <div>
      <section className="section section-white">
        <br />
        <div className="text-content product-detail">
            <h4>{produto.title}</h4>
          <div className="grid-img">
            <img src={produto.image} alt={produto.description} className="img-destaque2" />
            <p>
              <small>{produto.description}</small>
              <br />
              <i className="bx bxs-star" />
              <i className="bx bxs-star" />
              <i className="bx bxs-star" />
              <i className="bx bxs-star-half" />
              {produto.rating?.rate}
              <br />
              <strong>Price: {produto.price}</strong>
              <br />
              <br />
              <div className="controls">
                <button className="btn comprar-agora">BUY NOW!</button>

                <button className="btn add-carrinho">
                  ADD CART
                  <i className="bx bxs-cart-add" />
                </button>
              </div>
            </p>
          </div>
          <br />
        </div>
      </section>

      <h2>See other products</h2>
      <section className="section section-all-products products-details">
        <div className="grid-produtos">
          {produtos.map((produto) => (
            <div className="grid-produtos-content">
              <a href={'/product/' + produto.id}>
                <img src={produto.image} alt={produto.description} />
              </a>
              <br />
              <p className="titulo-produtos-grid">{produto.title}</p>
              <br />
              <p>
                <small>Rating:</small>
                <i className="bx bxs-star" />
                <i className="bx bxs-star" />
                <i className="bx bxs-star" />
                <i className="bx bxs-star" />
                {produto.rating?.rate}
              </p>
              <br />

              <strong>Price: {produto.price}</strong>
              <div className="controls">
                <button className="btn add-carrinho-small">
                  <i className="bx bxs-cart-add" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <br />
      </section>
    </div>
  );
}
