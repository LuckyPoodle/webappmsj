import React from 'react'
import Link from 'next/link';
import Image from 'next/image'

const ProductCard = ({product}) => {


  return (


    <div key={product._id} className="group relative p-4">
    <div className="w-80 h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
      <img
        src={product.mainImage}
        alt={product.mainImageAlt}
        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
      />
    </div>
    <div className="mt-4 flex justify-between">
      <div>
        <h3 className="text-sm text-gray-700">
       
          
            {product.name}
      
        </h3>
    
      </div>
      <p className="text-sm font-medium text-gray-900">${product.price}</p>
    </div>
  </div>

  )
}

export default ProductCard