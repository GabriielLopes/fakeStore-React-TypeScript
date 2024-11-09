import React from "react";
import { Rating } from "../interfaces/ratingProducts";

export default function AvaliacaoProduto(rating: Rating) {

  return (
    <div>
      <br />
      {Math.round(rating.rate) >= 1 ? <i className='bx bxs-star'></i> : <i className='bx bx-star'></i>}
      {Math.round(rating.rate) >= 2 ? <i className='bx bxs-star'></i> : <i className='bx bx-star'></i>}
      {Math.round(rating.rate) >= 3 ? <i className='bx bxs-star'></i> : <i className='bx bx-star'></i>}
      {Math.round(rating.rate) >= 4 ? <i className='bx bxs-star'></i> : <i className='bx bx-star'></i>}
      {Math.round(rating.rate) >= 5 ? <i className='bx bxs-star'></i> : <i className='bx bx-star'></i>}
      {rating.rate}
      <br />
    </div>
  )
}
