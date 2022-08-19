import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import SmallCard from '../components/SmallCard'
import Footer from "../components/Footer";
import MediumCard from '../components/MediumCard';
import LargeCard from '../components/LargeCard';
import Header from '../components/Header';
import axios from "axios";
import Hero from '../components/Hero';
import Banner from '../components/banner';
export default function Home({ products }) {
  return (

    <div>
      <Head>
        <title>Makeshipjoy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* <Hero /> */}
      <Banner />

      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section className='pt-6'>
          <h2 className='text-2xl italic font-semibold text-black-600 pb-5'>Latest Products/Services</h2>

          {/* on mobile grid has 1 column, sm screen 2 col, and so on */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products?.map((pdt) => (

              <SmallCard
                shopName={pdt.shop.shopTitle}
                shopSlug={pdt.shop.slug}
                slug={pdt.slug}
                key={pdt._id}
                img={pdt.mainImage}
                price={pdt.price}
                name={pdt.name}
                address={pdt.shop.address}
              />
            ))}

            {/* <button className='place-content-end' >See More...</button> */}
          </div>

        </section>

        <section>
          {/* <h2 className="text-4xl font-semibold py-8">Categories</h2>

          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData.map(({ img, title }) => (
              <MediumCard key={img + title} img={img} title={title} />
            ))}
          </div> */}
        </section>

        <LargeCard
          img="https://media.publit.io/file/home_business.jpeg"
          title=""
          description=""
          buttonText=""
        />
      </main>
      <Footer />

    </div>
  )
}


export async function getServerSideProps() {

  const { data } = await axios.get(
    `${process.env.api}/get-all-products`
  );
  console.log('gotten back all products ===========>>>>>>>>>>');
  console.log(data)

  // const productsData = await axios.get(`${process.env.api}/get-shop-products/${query.shopSlug}`);


  // console.log('gotten back DATA ===========>>>>>>>>>>');
  // console.log(productsData.data)

  return {
    props: {
      products: data,
      //products: productsData.data
    },
  };
}
