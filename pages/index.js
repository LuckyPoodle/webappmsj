import Head from 'next/head'
import Image from 'next/image'
import NearbySmallCard from '../components/NearbySmallCard'
import Footer from "../components/Footer";
import MediumCard from '../components/MediumCard'
import LargeCard from '../components/LargeCard'
import Header from '../components/Header'
import Hero from '../components/Hero'
export default function Home({exploreData,cardsData}) {
  return (

   <div>
     <Head>
       <title>Makeshipjoy</title>
       <link rel="icon" href="/favicon.ico" />
     </Head>
     <Header />
     <Hero />

     <main className='max-w-7xl mx-auto px-8 sm:px-16'>
       <section className='pt-6'>
         <h2 className='text-4xl font-semibold pb-5'>Explore nearby</h2>
        
        {/* on mobile grid has 1 column, sm screen 2 col, and so on */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(({ img, items, location }) => (
              <NearbySmallCard
                key={img+location}
                img={img}
                items={items}
                location={location}
              />
            ))}
          </div>
       </section>

       <section>
          <h2 className="text-4xl font-semibold py-8">Categories</h2>

          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData.map(({ img, title }) => (
              <MediumCard key={img+title} img={img} title={title} />
            ))}
          </div>
        </section>

        <LargeCard
          img="https://links.papareact.com/4cj"
          title="Value Creation is Everywhere"
          description="List your own business "
          buttonText="Start now"
        />
     </main>
     <Footer />
     
   </div>
  )
}


export async function getStaticProps() {
  const exploreData = await fetch("https://jsonkeeper.com/b/BCYB").then(
    (res) => res.json()
  );

  const cardsData = await fetch("https://jsonkeeper.com/b/RH31").then((res) =>
    res.json()
  );

  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
