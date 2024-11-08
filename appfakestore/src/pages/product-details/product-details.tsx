import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../interfaces/product';
import axios from '../../services/axios';
import { useParams } from 'react-router-dom';
import { Dispatch } from 'redux';

import '../../styles/product-details.css';
import { formatarValor } from '../../utils/formatarValor';
import produtoExisteNoCarrinho from '../../utils/produtoExisteNoCarrinho';
import { State } from '../../interfaces/state';
import { Carrinho } from '../../store/modules/type';
import aumentarQtdeItemCarrinho from '../../utils/aumentarQtdeItemCarrinho';
import Swal from 'sweetalert2';
import { addProduct } from '../../store/modules/carrinho/actionCreators';

export default function ProductDetails() {
  const dispatch: Dispatch<any> = useDispatch();

  const cart = useSelector<State>((state) => state.carrinho) as Carrinho;
  const [produto, setProduto] = useState<Product>({});
  const [produtos, setProdutos] = useState<Product[]>([]);
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/products/${id}`);
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

                <button className="btn add-carrinho" onClick={() => addItemCarrinho(produto)}>
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

              <strong>Price: {formatarValor.format(produto.price as number)}</strong>
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
