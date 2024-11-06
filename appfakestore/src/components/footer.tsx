import React from 'react';

import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>Fake store </strong> desenvolvido por: <strong>Gabriel Costa Lopes</strong>
        </p>
        <hr />
        <p className="">
          <i className="bx bxl-instagram" /> Gabriel_costa_lopes | <i className="bx bxl-facebook" />{' '}
          Gabriel Costa Lopes | <i className="bx bxs-envelope" /> Gabrielcostaplay@gmail.com |{' '}
          <i className="bx bxs-phone" /> 11 99343-5336
        </p>
      </div>
    </footer>
  );
}
