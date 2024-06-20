import React from 'react'
import './PerfumeBottle.css'
import { CiHeart } from "react-icons/ci";

export const PerfumeBottle = ({ name, src, price ,discount }) => {
  return (
    <div className="cperfume-bottle">
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