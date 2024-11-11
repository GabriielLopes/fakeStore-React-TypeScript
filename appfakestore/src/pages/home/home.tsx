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
  const produtos = useSelector<State>((state) => state.produtos.products) as Product[];
  const [produtosFiltrados, setProdutosFiltrados] = useState<Product[]>(produtos);
  const [categorias, setCategorias] = useState<string>('');

  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);

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
    aplicarFiltroPorCategoria(produtos, categorias);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorias, produtos]);

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

  const aplicarFiltroPorCategoria = (produtos: Product[], categoria: string) => {
    const categoriaFormatada = categoria.toLowerCase();
    setProdutosFiltrados(produtos);
    if (categorias === '') return;
    if (categoria === '') {
      setProdutosFiltrados(produtos);
    }
    const produtosFiltrados = produtos.filter((produto) => {
      if (!produto.category) return [];
      return produto.category === categoriaFormatada;
    });
    setProdutosFiltrados(produtosFiltrados);
  };

  console.log(produtosFiltrados);

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
              <input
                type="checkbox"
                name="electronics"
                value="Electronics"
                onChange={(e) => setCategorias(e.target.value)}
                checked={categorias === 'Electronics'}
              />
              <label htmlFor="eletronics">Electronics</label>
              <br />
              <input
                type="checkbox"
                name="jewelery"
                value={'Jewelery'}
                onChange={(e) => setCategorias(e.target.value)}
                checked={categorias === 'Jewelery'}
              />
              <label htmlFor="jewelery">Jewelery</label>
              <br />
              <input
                type="checkbox"
                name="men's clothing"
                value={`Men's Clothing`}
                onChange={(e) => {
                  setCategorias(e.target.value);
                }}
                checked={categorias === `Men's Clothing`}
              />
              <label htmlFor="mens Clothing">Men's Clothing</label>
              <br />
              <input
                type="checkbox"
                name="womens clothing"
                value={`Women's Clothing`}
                onChange={(e) => setCategorias(e.target.value)}
                checked={categorias === `Women's Clothing`}
              />
              <label htmlFor="womens clothing">Women's Clothing</label>
            </div>
            <button onClick={() => setCategorias('')}>Clear filters</button>
          </div>

          <div className="aside-lateral-content preco">
            <h5>Price</h5>
            <div className="display-filter-controls">
              <small className="price-min-value">{formatarValor.format(0)}</small>

              <small className="price-max-value">{formatarValor.format(1000)}</small>
            </div>
            <input
              type="range"
              min={0}
              value={price}
              max={1000}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
            <small className="price-value">{formatarValor.format(price)}</small>
          </div>

          <div className="aside-lateral-content avaliacao">
            <h5>Rating</h5>
            <div className="display-filter-controls">
              <small className="rating-min-value">
                0 <i className="bx bxs-star"></i>
              </small>
              <small className="rating-value">{rating}</small>
              <small className="rating-max-value">
                5 <i className="bx bxs-star"></i>
              </small>
            </div>
            <input
              type="range"
              min={0}
              value={rating}
              max={5}
              onChange={(e) => setRating(parseFloat(e.target.value))}
            />
          </div>
        </aside>

        <div className="grid-produtos">
          {produtosFiltrados.map((produto) => (
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
