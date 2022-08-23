import React from 'react'
import Header from '../../components/Header';
import { PhoneIcon,MailIcon } from '@heroicons/react/outline'
import axios from "axios";
import SmallCard from "../../components/SmallCard";
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
              <img src={shop.shopImage} className="h-full w-full rounded-full overflow-hidden shadow" />
            </div>

            <div className='h-20 w-20 rounded-full'>

            </div>

            <p class="lg:w-2/3 mx-auto  font-bold  leading-relaxed text-base">{shop.description}</p>

            <p class="lg:w-2/3 mx-auto pt-1 leading-relaxed text-base">{shop.address}</p>
            <p class="lg:w-2/3 mx-auto pt-1 leading-relaxed text-base">Delivery Info: {shop.deliveryPickUpInfo}</p>
            <p class="lg:w-2/3 mx-auto pt-1 leading-relaxed text-base">Delivery Fee: S${shop.deliveryFee}</p>
            <div className='flex flex-row'><MailIcon className='w-8 h-8' /><p class="lg:w-2/3 mx-auto pt-1 leading-relaxed text-base">{shop.shopContactEmail}</p></div>
           {shop.shopContactNumber? <div className='flex flex-row'><PhoneIcon className='w-8 h-8' /><p class="lg:w-2/3 mx-auto pt-1 leading-relaxed text-base">{shop.shopContactNumber}</p></div>:<></>}
            <a className='lg:w-2/3 mx-auto pt-1 leading-relaxed text-base'>{shop.siteLinkOne}</a>
            <a className='lg:w-2/3 mx-auto pt-1 leading-relaxed text-base'>{shop.siteLinkTwo}</a>
            <a className='lg:w-2/3 mx-auto pt-1 leading-relaxed text-base'>{shop.siteLinkThree}</a>
            <a className='lg:w-2/3 mx-auto pt-1 leading-relaxed text-base'>{shop.siteLinkFour}</a>

            {/* <div class="flex flex-wrap m-10 ">
            {products.map((pdt) => (
              <Link href={`/${shop.slug}/${pdt.slug}`}>
                <a>
                  <ProductCard product={pdt} />
                </a>
              </Link>
            ))} */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products?.map((pdt) => (

              <SmallCard
                shopName={pdt.shop.shopTitle}
                shopSlug={pdt.shop.slug}
                slug={pdt.slug}
                key={pdt._id}
                img={pdt.mainImage}
                price={pdt.price}
                rating={pdt.ratingsTotal}
                ratingCount={pdt.ratingCount}
                name={pdt.name}
                address={pdt.shop.address}
              />
            ))}

            {/* <button className='place-content-end' >See More...</button> */}
          </div>



      
          </div>
          
        </div>
      </section>



    </>
  )
}


export async function getServerSideProps({ query ,req,res}) {

  console.log(query.shopSlug)

  const { data } = await axios.get(
    `${process.env.api}/get-shop/${query.shopSlug}`
  );
  console.log('gotten back DATA ===========>>>>>>>>>>');
  console.log(data)
 

    if (!data) {
      return {
        notFound: true,
      }
    }
  
  
  console.log('HI i am in getServerSideprops of [shopSlug]/index');
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