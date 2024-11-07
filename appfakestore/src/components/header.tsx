import React, { useEffect, useState } from 'react';

import '../styles/header.css';
import axios from '../services/axios';

export default function Header() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get('/products/categories');
      setCategorias(response.data);
    }
    getData();
  }, []);

  function handleVisibleCart() {
    const divCartContent = document.querySelector('.container-cart');
    if (divCartContent?.classList[1] === 'visible') {
      return divCartContent.classList.remove('visible');
    }
    return divCartContent?.classList.add('visible');
  }

  return (
    <aside className="menu">
      <div className="main-content menu-content">
        <a href="/">
          <h1>LOGO</h1>
        </a>
        <nav>
          <ul>
            {categorias.map((categoria) => (
              <li>
                <a href={'/products/category/'+ categoria}>{categoria}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav>
          <ul>
            <li>
              <a href="#about">About us</a>
            </li>
            <li>
              <a onClick={handleVisibleCart} className='btn-icon-cart'>
                <i className="bx bx-shopping-bag" />
              </a>
            </li>
            <li>
              <a>
                <i className="bx bx-user" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
