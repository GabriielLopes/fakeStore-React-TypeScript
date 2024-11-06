import React, { useEffect, useState } from 'react';
import axios from '../../services/axios';

import '../../styles/home.css';
import '../../styles/button.css';

import { useInterval } from '../../hooks/use-interval';
import { Product } from '../../interfaces/product';

export default function Home() {
  const [imagesProducts, setImagesProducts] = useState<string[]>([]);
  const [imagemAtual, setImagemAtual] = useState(imagesProducts[0]);
  const [indexImagem, setIndexImagem] = useState(0);

  const [produtos, setProdutos] = useState<Product[]>([
    {
      description: 'teste',
      image: '"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    },
  ]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get('/products?limit=5');
      const arrayImages = [];
      for (let i = 0; i < 5; i++) {
        arrayImages.push(response.data[i].image);
      }
      setImagesProducts(arrayImages);
      setImagemAtual(arrayImages[0]);
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const response = await axios.get('/products/?sort=desc');
      setProdutos(response.data);
    }
    getData();
  }, []);

  useInterval(() => {
    proximaImagem(imagesProducts, indexImagem);
  }, 2000);

  const proximaImagem = (imagesProducts: string[], indexImagem: number): void => {
    setIndexImagem(indexImagem + 1);
    setImagemAtual(imagesProducts[indexImagem]);

    if (indexImagem >= 4) {
      setIndexImagem(0);
    }
  };

  return (
    <div>
      <section id="vitrineProdutos" className="section vitrine-produtos">
        <img alt="images" src={imagemAtual} className={'img-vitrine'} />
      </section>

      <section className="section section-white">
        <div className="text-content">
          <h3>THIS IS OUR LEADING SALES PRODUCT</h3>
          <div className="grid-img">
            <img src={produtos[0].image} alt={produtos[0].description} className="img-destaque2" />
            <p>
              {produtos[0].description}
              <br />
              <i className="bx bxs-star" />
              <i className="bx bxs-star" />
              <i className="bx bxs-star" />
              <i className="bx bxs-star-half" />
              {produtos[0].rating?.rate}
              <br />
              <strong>Price: {produtos[0].price}</strong>
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

      <section className="section home section-all-products">
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
