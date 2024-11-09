import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../services/axios';
import { Product } from '../../interfaces/product';
import { formatarValor } from '../../utils/formatarValor';

import '../../styles/products-category.css';
import { addItemCarrinho } from '../../utils/addItemCarrinho';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { State } from '../../interfaces/state';
import { Carrinho } from '../../store/modules/type';
import AvaliacaoProduto from '../../components/AvaliacaoProduto';
import { Rating } from '../../interfaces/ratingProducts';

export default function ProductsCategory() {
  const dispatch: Dispatch<any> = useDispatch();
  const [produtos, setProdutos] = useState<Product[]>([]);
  const cart = useSelector<State>((state) => state.carrinho) as Carrinho;
  const { category } = useParams();

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/products/category/${category}`);
      setProdutos(response.data);
    }
    getData();
  }, [category]);

  return (
    <>
    <section className="section section-products-category">
      <h1>{category}</h1>
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
            {produto.rating ? AvaliacaoProduto(produto.rating as Rating) : ""}
            </p>
            <br />

            <strong>Price: {formatarValor.format(produto.price as number)}</strong>
            <div className="controls">
              <button className="btn add-carrinho-small" onClick={() => addItemCarrinho(produto, dispatch, cart)}>
                <i className="bx bxs-cart-add" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <br />
    </section>
    </>
  );
}
