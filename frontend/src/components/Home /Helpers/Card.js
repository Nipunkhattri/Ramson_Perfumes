import React from 'react'
import './Card.css'
import { CiHeart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

export const Card = ({ name, src, price, discount,id }) => {
  const navigate = useNavigate();
  const handleNavigateproduct = (id) =>{
    console.log("Hii");
    navigate(`/product/${id}`)
}

  return (
    <div className="cperfume-bottle" onClick={() => handleNavigateproduct(id)}
    >
      <img src={src} alt={name} className='cperfume_images' />
      <CiHeart className='cheart' />
      <div className={`ctag ${discount > 0 ? '' : 'visible'}`}>
        <h2>{discount}%</h2>
      </div>
      <div className='ctext'>
        <p>New</p>
        <h2>{name}</h2>
        <h2>From Rs. {price}</h2>
      </div>
    </div>
  )
}