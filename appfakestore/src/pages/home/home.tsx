import React, { useEffect, useState } from 'react';
import axios from '../../services/axios';

// CSS
import '../../styles/home.css';
import '../../styles/button.css';

import { useInterval } from '../../hooks/use-interval';
import { Product } from '../../interfaces/product';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/modules/carrinho/actionCreators';
import { useSelector } from 'react-redux';
import { Carrinho } from '../../store/modules/type';
import { State } from '../../interfaces/state';
import produtoExisteNoCarrinho from '../../utils/produtoExisteNoCarrinho';
import aumentarQtdeItemCarrinho from '../../utils/aumentarQtdeItemCarrinho';
import Swal from 'sweetalert2';

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

  const addItemCarrinho = (product: Product): void => {
    if (!product) return;
    if (produtoExisteNoCarrinho(cart, product.id as number)) {
      if (typeof product.id !== 'number') return;
      aumentarQtdeItemCarrinho({ productId: product.id, quantity: 1 }, dispatch);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        heightAuto: true,
        title: 'Added another quantity to the cart.',
        showConfirmButton: false,
        timer: 800,
      });
      return;
    }
    dispatch(
      addProduct({
        productId: product.id ?? 0,
        quantity: 1,
      }),
    );
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Product added to cart',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div>
      <section id="vitrineProdutos" className="section vitrine-produtos">
        <img alt="images" src={imagemAtual} className={'img-vitrine'} />
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
                <button className="btn add-carrinho-small" onClick={() => addItemCarrinho(produto)}>
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
