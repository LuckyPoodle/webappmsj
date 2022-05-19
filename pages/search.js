import React, { useEffect, useState } from 'react';
import SmallCard from '../components/SmallCard';
import Header from '../components/Header'
import dynamic from 'next/dynamic'
import algoliasearch from "algoliasearch"
//localhost:3000/search?term=eraser&latitude=11&longitude=11&address=abc
import { useRouter } from "next/router";

const Map = dynamic(() => import("../components/Map"), {
  loading: () => "loading...",
  ssr: false,
})

const CategoryPage = () => {
  const router = useRouter();
  const client = algoliasearch(process.env.algoliaApp, process.env.algoliaAdminApiKey);
  const index = client.initIndex("shopproducts");

 // const { term, latitude, longitude, address } = router.query;
//http://localhost:3000/search?location=ll&startDate=2022-05-14T10%3A05%3A18.813Z&endDate=2022-05-14T10%3A05%3A18.813Z&noOfGuests=1
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log(router.query)
    console.log('hey in search');
    console.log(router.query.item);
    console.log(router.query.latitude);
    console.log(router.query.longitude);
    console.log(router.query.address);
    index
      .search(router.query.item)
      .then(({ hits }) => {
        console.log("INDEX SEARCH HITS")
        console.log(hits);
        setSearchResults(hits)
        
      })
      .catch(err => {
        console.log(err);
      });

  }, [router.query])

  useEffect(()=>{
    searchResults.map((p)=>{
      console.log('SEARCH RESULTS?')
      console.log(p.name)
      console.log(p.price)
    })

  },[searchResults])

  return (
    <div className='h-screen'>

      <Header />

      <main className='flex'>
        <section className='flex-grow pt-14 px-6'>
          <p className='text-xs'>
              {router.query.item}   -   {router.query.address?"Near "+router.query.address:"Anywhere"}
       
             
          </p>
          <div className='flex flex-col'>
            {searchResults?searchResults.map((pdt) => (
              <SmallCard
                shopName={pdt.shopName}
                shopSlug={pdt.shopSlug}
                slug={pdt.slug}
                key={pdt.objectID}
                img={pdt.mainImage}
                price={pdt.price}
                name={pdt.name}
                address={pdt.address}
              />
            )):<p>Loading</p>}
        
          </div>
        </section>
        <section className='hidden xl:inline-flex xl:min-w-[600px]'>
  



        </section>
      </main>

    </div>
  )
}

export default CategoryPage;