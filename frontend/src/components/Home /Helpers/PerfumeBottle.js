import React from 'react'
import './PerfumeBottle.css'
import { CiHeart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

export const PerfumeBottle = ({ name, src, price ,discount ,id}) => {
  const navigate = useNavigate();
  const handleNavigateproduct = (id) =>{
    console.log("Hii");
    navigate(`/product/${id}`)
}
  return (
    <div className="cperfume-bottle"  onClick={() => handleNavigateproduct(id)}>
      <img src={src} alt={name} className='hcperfume_images'/>
      <CiHeart className='cheart'/>
      <div className={`hctag ${discount > 0 ? '' : 'visible'}`}>
        <h2>{discount}%</h2>
      </div>
      <div className='hctext'>
        <p>New</p>
        <h2>{name}</h2>
        <h2>From Rs. {price}</h2>
      </div>
    </div>
  )
}