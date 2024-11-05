import React, { useEffect, useState } from 'react';
import axios from '../../services/axios';

import '../../styles/home.css';
import { useInterval } from '../../hooks/use-interval';

export default function Home() {
  const [imagesProducts, setImagesProducts] = useState<string[]>([]);
  const [imagemAtual, setImagemAtual] = useState(imagesProducts[0]);
  const [indexImagem, setIndexImagem] = useState(0);
  const [imgPosicao, setImgPosicao] = useState('');

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

  console.log(imagemAtual);

  useInterval(() => {
    proximaImagem(imagesProducts, indexImagem);
  }, 9000);

  useInterval(() => {
    setImgPosicao('direita');
  }, 7000);

  useInterval(() => {
    setImgPosicao('');
  }, 7500);

  const proximaImagem = (imagesProducts: string[], indexImagem: number): void => {
    setIndexImagem(indexImagem + 1);
    setImagemAtual(imagesProducts[indexImagem]);
    setImgPosicao('center');

    if (indexImagem >= 4) {
      setIndexImagem(0);
      setImgPosicao('center');
    }
  };

  return (
    <div>
      <section id="vitrineProdutos" className="vitrine-produtos">
        <img alt="images" src={imagemAtual} className={'img-vitrine ' + imgPosicao} />
      </section>

      <section>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni soluta corporis officiis
        perferendis temporibus! Dignissimos repellat quasi ducimus! Reiciendis distinctio qui vitae
        repellendus neque, error impedit assumenda natus odit temporibus!
      </section>
    </div>
  );
}
