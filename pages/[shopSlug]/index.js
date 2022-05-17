import React, { useEffect } from 'react'
import Header from '../../components/Header';
import Image from 'next/image'
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import Link from 'next/link'
const ShopFront = ({ shop, products }) => {





  return (
    <>

      <Header />
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex  flex-col items-center text-center w-full mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{shop.shopTitle}</h1>
            <div className="h-32 w-32 mb-4 lg:mb-0 mr-4 content-center">
              <img src={shop.shopImage} alt className="h-full w-full rounded-full overflow-hidden shadow" />
            </div>

            <div className='h-20 w-20 rounded-full'>

            </div>

            <p class="lg:w-2/3 mx-auto  font-bold  leading-relaxed text-base">{shop.description}</p>

            <p class="lg:w-2/3 mx-auto pt-1 leading-relaxed text-base">{shop.address}</p>
          </div>
          <div class="flex flex-wrap -m-4">
            {products.map((pdt) => (
              <Link href={`/${shop.slug}/${pdt.slug}`}>
                <a>
                  <ProductCard product={pdt} />
                </a>
              </Link>
            ))}



          </div>
        </div>
      </section>



    </>
  )
}


export async function getServerSideProps({ query }) {

  console.log(query.shopSlug)

  const { data } = await axios.get(
    `${process.env.api}/get-shop/${query.shopSlug}`
  );
  console.log('gotten back DATA ===========>>>>>>>>>>');
  console.log(data)

  const productsData = await axios.get(`${process.env.api}/get-shop-products/${query.shopSlug}`);


  console.log('gotten back DATA ===========>>>>>>>>>>');
  console.log(productsData.data)

  return {
    props: {
      shop: data,
      products: productsData.data
    },
  };
}


export default ShopFront