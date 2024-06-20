import React from 'react'
import '../Products/Product.css'
import { PerfumeBottle } from './PerfumeBottle'
export const PerfumeRow = ({perfumes}) => {
  return (
<div className="perfume-row">
      {perfumes.map((perfume) => (
        <PerfumeBottle key={perfume.name} {...perfume} />
      ))}
    </div>  )
}
