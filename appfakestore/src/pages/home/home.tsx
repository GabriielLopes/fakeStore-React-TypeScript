import React, { useEffect, useState } from 'react';
import axios from '../../services/axios';

// CSS
import '../../styles/home.css';
import '../../styles/button.css';
import '../../styles/aside.css';

import { useInterval } from '../../hooks/use-interval';
import { Product } from '../../interfaces/product';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Carrinho } from '../../store/modules/type';
import { State } from '../../interfaces/state';
import { formatarValor } from '../../utils/formatarValor';
import { addItemCarrinho } from '../../utils/addItemCarrinho';
import AvaliacaoProduto from '../../components/AvaliacaoProduto';
import { Rating } from '../../interfaces/ratingProducts';

export default function Home() {
  const dispatch: Dispatch<any> = useDispatch();
  const cart = useSelector<State>((state) => state.carrinho) as Carrinho;
  const [imagesProducts, setImagesProducts] = useState<string[]>([]);
  const [imagemAtual, setImagemAtual] = useState(imagesProducts[0]);
  const [indexImagem, setIndexImagem] = useState(0);
  const [produtos, setProdutos] = useState<Product[]>([
    {
      image: '',
      description: '',
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

      <section className="section home section-all-products">
        <aside className="aside-lateral">
          <div className="aside-lateral-content categorias">
            <h5>Categoryies</h5>
            <div className="aside-lateral-content-itens">
              <input type="checkbox" name="electronics" />
              <label htmlFor='eletronics'>Electronics</label>
              <br />
              <input type="checkbox" name="jewelery" />
              <label htmlFor='jewelery'>Jewelery</label>
              <br />
              <input type="checkbox" name="men's clothing" />
              <label htmlFor='mens Clothing'>men's Clothing</label>
              <br />
              <input type="checkbox" name="womens clothing" />
              <label htmlFor='womens clothing'>Women's Clothing</label>
            </div>
          </div>

          <div className="aside-lateral-content preco">
            <h5>Preço</h5>
            <input type="range" min={0} max={5000} />
          </div>

          <div className="aside-lateral-content avaliacao">
            <h5>Avaliacao</h5>
            <input type="range" min={1} max={5} />
          </div>
        </aside>

        <div className="grid-produtos">
          {produtos.map((produto) => (
            <div className="grid-produtos-content">
              <a href={'/product/' + produto.id}>
                <img src={produto.image} alt={produto.description} />
              </a>
              <br />
              <p className="titulo-produtos-grid">{produto.title}</p>
              <br />
              <p>{produto.rating ? AvaliacaoProduto(produto.rating as Rating) : ''}</p>
              <br />

              <strong>Price: {formatarValor.format(produto.price as number)}</strong>
              <div className="controls">
                <button
                  className="btn add-carrinho-small"
                  onClick={() => addItemCarrinho(produto, dispatch, cart)}
                >
                  Add <i className="bx bxs-cart-add" />
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
