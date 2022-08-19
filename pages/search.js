import React, { useEffect, useState, useContext } from 'react';
import SmallCard from '../components/SmallCard';
import Header from '../components/Header'
import dynamic from 'next/dynamic'
import algoliasearch from "algoliasearch"
import { Context } from '../context'
import Footer from "../components/Footer";
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

  const { state: { currentSelectedPdtId }, dispatch } = useContext(Context);

  // const { term, latitude, longitude, address } = router.query;
  //http://localhost:3000/search?location=ll&startDate=2022-05-14T10%3A05%3A18.813Z&endDate=2022-05-14T10%3A05%3A18.813Z&noOfGuests=1
  const [searchResults, setSearchResults] = useState([]);
  const [filteredByLocationResults, setFilteredByLocationResults] = useState([])

  useEffect(() => {


    index
      .search(router.query.item)
      .then(({ hits }) => {

        setSearchResults(hits)

      })
      .catch(err => {
        console.log(err);
      });

  }, [router.query]);

  function getDistanceInKm(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344

    return dist
  }




  useEffect(() => {

    console.log(router.query.latitude == null)
    if (router.query.latitude == 0 && router.query.longitude == 0 || router.query.latitude == 'null' || router.query.longitude == 'null') {



      setFilteredByLocationResults(searchResults)
    } else {
      let templist = []
      searchResults.map((p) => {

        let distance = getDistanceInKm(p.latitude, p.longitude, router.query.latitude, router.query.longitude);
     
        if (distance < 5) {

          templist.push(p);

        }
      });
      setFilteredByLocationResults(templist);


    }

  }, [searchResults])


  return (
    <div className='bg-yellow h-screen'>

      <Header />


      <p className='text-lg pl-5'>
        {router.query.item}   -   {router.query.address ? "Within 5 KM of  " + router.query.address : "Anywhere"}


      </p>
      <div className='bg-white h-full'>
       

        <main className='flex flex-wrap h-screen w-full'>
          <section className='w-full h-1/2 md:h-full  md:w-1/2 lg:w-1/2 xl:w-1/3  overflow-scroll  '>

            <div className=' h-screen grid grid-cols-2 '>
              {filteredByLocationResults ? filteredByLocationResults.map((pdt) => (
                <div onMouseEnter={() => dispatch({
                  type: "SET_CURRENT_SELECTED_PRDT_ID",
                  payload: pdt.objectID,
                })} onTouchStart={() => dispatch({
                  type: "SET_CURRENT_SELECTED_PRDT_ID",
                  payload: pdt.objectID,
                })}   >
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

                </div>
              )) : <p className='italic sm'>Loading</p>}

            </div>
          </section>
          <section className='bg-white w-full h-1/2 xl:w-2/3 md:w-1/2 lg:w-1/2 xl:w-2/3 lg:h-full sm:h-full md:h-full overflow-x-scroll overflow-y-hidden  p-5 '>

            <div className='h-full w-full '> {filteredByLocationResults.length>=1?<Map searchResults={filteredByLocationResults} />:<>
            
                <div className='container'>
                  <h2>No Relevant Search Results</h2>

                </div>
            </>}</div>


          </section>
        </main>
      </div>
      {/* <Footer /> */}

    </div>
  )
}

export default CategoryPage;