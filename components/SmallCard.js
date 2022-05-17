import React from 'react'
import Link from 'next/link'
import Image from "next/image";
import shop from '../../newmakeshipjoy/server/models/shop';
const SmallCard = ({ shopName, shopSlug,slug, img, name,address, price }) => {


  return (
 <Link href={`/${shopSlug}/${slug}`}>
    <div className="flex items-center m-2 space-x-4 mt-5 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out">
    <div className="relative h-16 w-16">
      <Image src={img} layout="fill" className="rounded-lg" />
    </div>
    <div>
      <h5 className='text-sm italic'>{shopName}</h5>
      <h2 className='text-xs'>{address.substr(0, address.indexOf(','))}</h2>
      <h2 className='font-semibold'> {name}</h2>
      <h3 className="text-black-600 ">${price}</h3>
    </div>
  </div>
  </Link>
  )
}

export default SmallCard