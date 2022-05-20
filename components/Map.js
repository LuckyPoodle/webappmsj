import { useState, useContext, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import { Context } from '../context/index'
import Link from "next/link"
import { ArrowRightIcon } from '@heroicons/react/outline'

const Map = ({ searchResults }) => {
  const [selectedLocation, setSelectedLocation] = useState({});
  const { state: { currentSelectedPdtId },dispatch } = useContext(Context);

  //   Transform coordinates into required array of objects in the correct shape
  const coordinates = searchResults.map((result) => ({
    latitude: Number(result.latitude),
    longitude: Number(result.longitude),
  }));

  // The latitude and longitude of the center of locations coordinates
  const center = getCenter(coordinates);

  useEffect(()=>{
    console.log('in map');
    console.log(searchResults)

  },[])

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,



  });

  return (
    <ReactMapGL

      mapStyle="mapbox://styles/happyjui/cl3e2574q002r14rsrdthvi59"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      minZoom={5}
      maxZoom={15}



    >
      {searchResults.map((result) => (
        <div key={result.objectID}>
          {/* The markers for the airbnb properties */}
          <Marker
            latitude={Number(result.latitude)}
            longitude={Number(result.longitude)}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <a
              onClick={() => {
                setSelectedLocation(result);
              }}
            >
              <p
                role="img"
                className="cursor-pointer text-2xl animate-bounce"
                aria-label="push-pin"
              >
                📌
              </p>
            </a>
          </Marker>


    
          {(currentSelectedPdtId === result.objectID ||selectedLocation.longitude === result.longitude ) ? (
            <Popup
              onClose={()=>{
                dispatch({
                  type: "SET_CURRENT_SELECTED_PRDT_ID",
                  payload: '',
                })
                setSelectedLocation({})}}
              closeOnClick={true}
              latitude={Number(result.latitude)}
              className='p-2'
              longitude={Number(result.longitude)}
            >
              {/* <span className="italic bold">{result.shopName}</span>
              <h5>{result.name}</h5> */}

              <div>
                <div className="flex w-full items-center dark:bg-gray-900 flex justify-center items-center ">
                  <div>
                    <div className=" flex flex-col justify-between bg-white dark:bg-gray-800 rounded-lg  border-gray-400 mb-6">
                      <div>
                        <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">{result.shopName}</h4>
                        <p className="text-gray-800 dark:text-gray-100 text-sm">{result.name}</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-gray-800">
                          <p className="text-sm dark:text-gray-100">${result.price}</p>
                          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                           <Link href={`${result.shopSlug}/${result.slug}`} >
                            <a>
                            <ArrowRightIcon className="h-6 w-6 text-white cursor-pointer"  />
                            </a>
                           </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
