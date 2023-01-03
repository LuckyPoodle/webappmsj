import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const SmallCard = ({
  shopName,
  shopSlug,
  slug,
  img,
  name,
  address,
  rating,
  ratingCount,
  price,
}) => {
  return (
    <div className='h-400 w-400 m-4'>
      <div className='w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700'>
        <div className='flex justify-center'>
          <div className=''>
            <Image
              alt=''
              className='rounded-t-lg object-fill'
              src={img ? img : 'https://media.publit.io/file/Untitled-4-h.jpeg'}
              height={200}
              width={200}
            />
          </div>
        </div>
        <div className='px-5 pb-5'>
          <span className=' text-xs font-semibold'>{shopName}</span>
          <h5 className='text-xl pb-2 font-semibold tracking-tight text-gray-900 dark:text-white'>
            {name}
          </h5>

          <div className='flex items-center mt-2.5 mb-5'>
            <span className='bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3'>
              {address}
            </span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-xl font-bold text-gray-900 dark:text-white'>
              ${price}
            </span>
            <Link href={`/${shopSlug}/${slug}`}>
              <a
                href='#'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                View
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmallCard
