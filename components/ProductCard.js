import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const ProductCard = ({ product }) => {
  return (
    <div key={product._id} className='group relative p-4'>
      <div className='w-80 h-80 bg-gray-200  rounded-md overflow-hidden group-hover:opacity-75 '>
        <div className='h-full w-full'>
          <Image
            src={product.mainImage}
            alt={product.mainImageAlt}
            layout='fill'
          />
        </div>
      </div>
      <div className='mt-4 flex justify-between'>
        <div>
          <h3 className='text-sm text-gray-700'>{product.name}</h3>
        </div>
        <p className='text-sm font-medium text-gray-900'>${product.price}</p>
      </div>
    </div>
  )
}

export default ProductCard
