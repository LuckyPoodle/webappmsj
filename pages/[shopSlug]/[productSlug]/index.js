/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react'
import { Context } from '../../../context'
import Link from 'next/link'

import renderHTML from 'react-render-html'
import Header from '../../../components/Header'
import Image from 'next/image'
import axios from 'axios'

import { useRouter } from 'next/router'

const ProductDetails = ({ product }) => {
  const { _, dispatch } = useContext(Context)
  const router = useRouter()
  const [currentImage, setCurrentImage] = useState(product.mainImage)
  const [imagesToShow, setImagesToShow] = useState([])
  const [shipping, setShipping] = useState('false')
  const [inclusivePrice, setInclusivePrice] = useState(0)
  const [rating, setRating] = useState(0)
  useEffect(() => {
    setCurrentImage(product.mainImage)
    setInclusivePrice(product.price)
    var imagesList = [product.mainImage]

    product.images.forEach((i) => {
      imagesList.push(i)
    })

    setImagesToShow(imagesList)
    if (product.ratingCount !== 0) {
      setRating(Math.round(product.ratingsTotal / product.ratingCount))
    }
  }, [])

  useEffect(() => {
    //to reset shipping state

    setShipping('false')
  }, [router.query])

  if (!product) {
    return <div className='h-screen'> Loading </div>
  }

  const handlePressAddToCart = (pdt) => {
    pdt.inclusivePrice = inclusivePrice
    pdt.shipping = shipping
    pdt.shopId = product.shop._id
    pdt.shopName = product.shop.shopTitle
    pdt.shopShippingFee = product.shop.deliveryFee

    dispatch({
      type: 'ADDTOCART',
      payload: pdt,
    })
  }

  const handleSelectShipping = (e) => {
    setShipping(e.target.value)
    if (e.target.value == 'true') {
      //UPDATE : currently not implementing individual product delivery fee
      //let newprice = product.deliveryPrice + product.price;
      let newprice = product.price

      setInclusivePrice(newprice)
    } else {
      setInclusivePrice(product.price)
    }
  }

  return (
    <div className='h-screen'>
      <Header />

      <div className='h-full bg-white overflow-y-scroll hide-scroll-bar md:flex items-start justify-center py-12 pb-50 2xl:px-20 md:px-6 px-4'>
        <div className='flex-col md:block hidden'>
          <Image
            className='w-full'
            width={600}
            height={600}
            alt={product.mainImageAlt}
            src={currentImage}
          />
          <div className='flex space-x-3 overflow-scroll hide-scroll-bar p-3 -ml-3'>
            {imagesToShow?.map((image) => (
              <img
                key={image}
                alt={product.mainImageAlt}
                onClick={() => setCurrentImage(image)}
                className='md:w-48 md:h-48 w-15 h-15'
                src={image}
              />
            ))}
          </div>
        </div>
        <div className='md:hidden'>
          <Image
            className='w-full'
            width={600}
            height={600}
            alt={product.mainImageAlt}
            src={currentImage}
          />
          <div className='flex space-x-3 overflow-scroll  p-3 -ml-3'>
            {imagesToShow?.map((image) => (
              <img
                key={image}
                alt={product.mainImageAlt}
                onClick={() => setCurrentImage(image)}
                className='md:w-48 md:h-48 w-20 h-20'
                src={image}
              />
            ))}
          </div>
        </div>
        <div></div>
        <div className='xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6'>
          <div className='  pb-6'>
            <Link href={`/${product.shop.slug}`}>
              <a className='text-sm underline leading-none text-gray-600'>
                {product.shop.shopTitle}
              </a>
            </Link>
            <h1
              className='
                lg:text-2xl
                text-xl
                font-semibold
                lg:leading-6
                leading-7
                text-gray-800
                mt-2
            '
            >
              {product.name}
            </h1>

            <div className='py-4 flex items-center justify-between'>
              <div className='flex w-full'>
                {product.ratingsTotal == 0 ? (
                  <div className='flex flex-row'>
                    <Image
                      src='/blackstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/blackstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/blackstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />
                    <Image
                      src='/blackstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/blackstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <span className='mt-5'>
                      {product.ratingCount} review(s)
                    </span>
                  </div>
                ) : product.ratingsTotal >= 1 && product.ratingsTotal < 2 ? (
                  <div className='flex flex-row'>
                    <Image
                      src='/yellowstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/blackstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/blackstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/blackstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/blackstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <span className='mt-5'>
                      {product.ratingCount} review(s)
                    </span>
                  </div>
                ) : product.ratingsTotal >= 2 && product.ratingsTotal < 3 ? (
                  <div className='flex flex-row'>
                    <Image
                      src='/yellowstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/yellowstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/blackstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/blackstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/blackstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <span className='mt-5'>
                      {product.ratingCount} review(s)
                    </span>
                  </div>
                ) : product.ratingsTotal >= 3 && product.ratingsTotal < 4 ? (
                  <div className='flex flex-row'>
                    <Image
                      src='/yellowstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/yellowstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/yellowstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/blackstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/blackstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <span className='mt-5'>
                      {product.ratingCount} review(s)
                    </span>
                  </div>
                ) : product.ratingsTotal >= 4 && product.ratingsTotal < 5 ? (
                  <div className='flex flex-row'>
                    {' '}
                    <Image
                      src='/yellowstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/yellowstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/yellowstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/yellowstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/blackstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <span className='mt-5'>
                      {product.ratingCount} review(s)
                    </span>{' '}
                  </div>
                ) : product.ratingsTotal == 5 ? (
                  <div className='flex flex-row'>
                    <Image
                      src='/yellowstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/yellowstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/yellowstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/yellowstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <Image
                      src='/yellowstar.png'
                      alt='me'
                      width='20'
                      height='20'
                    />{' '}
                    <span className='mt-5'>
                      {product.ratingCount} review(s)
                    </span>
                  </div>
                ) : (
                  <></>
                )}
              </div>

              <Link
                className='leading-4'
                href={`/${product.shop.slug}/${product.slug}/reviews?product=${product._id}&productName=${product.name}`}
              >
                <a className='text-sm leading-none text-gray-600'>
                  Read/Write Reviews
                </a>
              </Link>
            </div>
            <span className='text-black text-lg  '>$ {inclusivePrice}</span>
          </div>
          {product.deliveryAvailable ? (
            <div className='py-4   flex items-center justify-between'>
              <p className='text-base leading-4 text-gray-800'>
                Local Delivery?
              </p>
              <div className='flex items-center justify-center'>
                <select
                  className='text-black'
                  value={shipping}
                  onChange={handleSelectShipping}
                >
                  <option value='true'>Yes</option>
                  <option value='false'>No (Pickup) </option>
                </select>
              </div>
            </div>
          ) : (
            <p className='text-sm font-bold pb-2'>Pick Up Only</p>
          )}

          <div className='mb-10'>
            <span className='bg-blue-100 text-blue-800 text-sm font-semibold mr-2 p-2 rounded dark:bg-blue-200 dark:text-blue-800 '>
              {product.address}
            </span>
            🔍{' '}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${product.latitude},${product.longitude}`}
              target='_blank'
              className='text-black underline text-xs'
              rel='noreferrer'
            >
              Open Google Map
            </a>
          </div>

          {product.outOfStock != true ? (
            <button
              onClick={() => handlePressAddToCart(product)}
              className='
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
            text-base
            flex
            items-center
            justify-center
            leading-none
            text-white
            bg-gray-800
            w-full
            py-4
            hover:bg-gray-700
        '
            >
              Add To Cart
            </button>
          ) : (
            <button
              disabled={true}
              className='
           
            text-base
            flex
            items-center
            justify-center
            leading-none
            text-white
            bg-gray-800
            w-full
            py-4
           
        '
            >
              Unavailable
            </button>
          )}
          <div>
            <p className='xl:pr-8 text-base lg:leading-tight leading-normal text-gray-600 mt-7'>
              {renderHTML(product.description)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  try {
    const { params } = context
    const { shopSlug, productSlug } = params
    const { data } = await axios.get(
      `${process.env.api}/read-product/${shopSlug}/${productSlug}`
    )
    if (!data) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        product: data,
      },
      revalidate: 60,
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

export async function getStaticPaths() {
  const { data } = await axios.get(`${process.env.api}/get-all-products`)
  const paths = data.map((pdt) => ({
    params: { productSlug: pdt.slug, shopSlug: pdt.shopSlug },
  }))
  /// TO CHANGE THIS TO PREFETCH FEATURED PRODUCTS ONLY
  /// AND THEN SET FALLBACK TO TRUE SO if app encounters non-generated slug it will dynamically fetch
  return {
    paths: paths,
    fallback: true,
  }
}

export default ProductDetails
