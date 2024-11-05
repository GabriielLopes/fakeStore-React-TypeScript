import React, { useEffect, useState } from 'react';
import axios from '../../services/axios';

import '../../styles/home.css';
import '../../styles/button.css';
import { useInterval } from '../../hooks/use-interval';

interface productsList {
  category?: string;
  description?: string;
  id?: number;
  image?: string;
  price?: number;
  rating?: {
    count?: number;
    rate?: number;
  };
  title?: string;
}
export default function Home() {
  const [imagesProducts, setImagesProducts] = useState<string[]>([]);
  const [imagemAtual, setImagemAtual] = useState(imagesProducts[0]);
  const [indexImagem, setIndexImagem] = useState(0);
  const [imgPosicao, setImgPosicao] = useState('');
  const [produtos, setProdutos] = useState<productsList[]>([
    {
      description: 'teste',
    },
  ]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get('https://fakestoreapi.com/products?limit=5');
      const arrayImages = [];
      for (let i = 0; i < 5; i++) {
        arrayImages.push(response.data[i].image);
      }
      setImagesProducts(arrayImages);
      setImagemAtual(arrayImages[0]);
      setImgPosicao('center');
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const response = await axios.get('products');
      setProdutos(response.data);
    }
    getData();
  }, []);

  useInterval(() => {
    proximaImagem(imagesProducts, indexImagem);
  }, 9000);

  useInterval(() => {
    setImgPosicao('direita');
  }, 8000);

  useInterval(() => {
    setImgPosicao('');
  }, 8500);

  const proximaImagem = (imagesProducts: string[], indexImagem: number): void => {
    setIndexImagem(indexImagem + 1);
    setImagemAtual(imagesProducts[indexImagem]);
    setImgPosicao('center');

    if (indexImagem >= 4) {
      setIndexImagem(0);
      setImgPosicao('center');
    }
  };

  console.log(produtos[0]);
  return (
    <div>
      <section id="vitrineProdutos" className="section vitrine-produtos">
        <img alt="images" src={imagemAtual} className={'img-vitrine ' + imgPosicao} />
      </section>

      <section className="section section-white">
        <div className="text-content">
          <h3>{produtos[0].title}</h3>
          <div className="grid-img">
            <img src={produtos[0].image} alt={produtos[0].description} className="img-destaque2" />
            <p>
              {produtos[0].description}
              <br />
              <br />
              <strong>Price: {produtos[0].price}</strong>
              <br />
              <br />
              <div className="controls">
                <button className="btn comprar">BUY NOW!</button>

                <button className="btn add-carrinho">
                  ADD CART
                  <i className="bx bxs-cart-add" />
                </button>
              </div>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
