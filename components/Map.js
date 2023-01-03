import { useState, useContext, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
// import Map,{Marker,Popup} from 'react-map-gl';
import getCenter from 'geolib/es/getCenter'
import { Context } from '../context/index'

const Map = ({ searchResults }) => {
  const [selectedLocation, setSelectedLocation] = useState({})
  const {
    state: { currentSelectedPdtId },
    dispatch,
  } = useContext(Context)

  //   Transform coordinates into required array of objects in the correct shape
  const coordinates = searchResults.map((result) => ({
    latitude: Number(result.latitude),
    longitude: Number(result.longitude),
  }))

  // The latitude and longitude of the center of locations coordinates
  const center = getCenter(coordinates)

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 10,
  })

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/happyjui/cl3e2574q002r14rsrdthvi59'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      minZoom={5}
      maxZoom={15}
    >
      {searchResults.map((result) => (
        <div key={result.objectID}>
          <Marker
            latitude={Number(result.latitude)}
            longitude={Number(result.longitude)}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <a
              onClick={() => {
                setSelectedLocation(result)
              }}
            >
              <p
                role='img'
                className='cursor-pointer text-2xl animate-bounce'
                aria-label='push-pin'
              >
                📌
              </p>
            </a>
          </Marker>

          {currentSelectedPdtId === result.objectID ||
          selectedLocation.longitude === result.longitude ? (
            <Popup
              onClose={() => {
                dispatch({
                  type: 'SET_CURRENT_SELECTED_PRDT_ID',
                  payload: '',
                })
                setSelectedLocation({})
              }}
              closeOnClick={true}
              latitude={Number(result.latitude)}
              longitude={Number(result.longitude)}
            >
              <div className='p-2'>
                <div className='p-1 text-sm font-bold text-black'>
                  {result.name}
                </div>
                🔍{' '}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${result.latitude},${result.longitude}`}
                  target='_blank'
                  className='text-black underline text-xs'
                  rel='noreferrer'
                >
                  Open Google Map
                </a>
              </div>
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  )
}

export default Map
