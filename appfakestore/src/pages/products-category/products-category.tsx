import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../services/axios';
import { Product } from '../../interfaces/product';

export default function ProductsCategory() {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const { category } = useParams();

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/products/category/${category}`);
      setProdutos(response.data);
    }
    getData();
  }, [category]);

  console.log(produtos);

  return (
    <section className="section section-all-products">
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
  );
}
