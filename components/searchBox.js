import React, { useEffect,useState } from 'react';
import usePlacesAutocomplete,{getGeocode,getLatLng} from 'use-places-autocomplete';
import { useGoogleMapsScript, Libraries } from 'use-google-maps-script';
import {Combobox,ComboboxInput,ComboboxPopover,ComboboxList,ComboboxOption} from "@reach/combobox"
import "@reach/combobox/styles.css"

import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  libraries: ["places"]
});

console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY)



const SearchBox = ({onSelectAddress,defaultValue}) => {

  const [loaded,setLoaded]=useState(false);

  useEffect(()=>{
    loader
    .load()
    .then((google) => {
      console.log('load in searchbox ');
      console.log(google);
      setLoaded(true);
    
    })
    .catch(e => {
      console.log("error",e)
      setLoaded(false)
    });
  })

  
  return (
   loaded? <ReadySearchBox onSelectAddress={onSelectAddress} defaultValue={defaultValue } />:<h1>loading</h1>
  )





 
}

function ReadySearchBox({onSelectAddress,defaultValue}){
    const {ready,value,setValue,suggestions:{status,data},clearSuggestions}=usePlacesAutocomplete({debounce:300,defaultValue});

    //when user picks one
    const handleSelect=async(address)=>{
      setValue(address,false); //false is for shouldFetchData as we already hav the data 
      clearSuggestions();

      try{

        //we took the address, want to get the lat and long from it
        const results=await getGeocode({address});
        const {lat,lng}=await getLatLng(results[0]);
        console.log('LAT AND LNG!!!!!!');
        console.log(lat,lng)

        onSelectAddress(address,lat,lng);


      }catch(error){

        console.error(' ERRORRR : ',error);


      }
   
    
    }

    console.log({status,data})

    const handleChange=(event)=>{
      setValue(event.target.value);
      if (event.target.value===""){
        //meaning user cleared
        onSelectAddress("",null,null);
      }

    }

    return (
        <Combobox onSelect={handleSelect}>

            <ComboboxInput 
            id="search" className="w-full p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
             value={value} onChange={handleChange} disabled={!ready} 
              placeholder="Search locations" autoComplete="off"  />

            <ComboboxPopover>
               {status==="OK" && data.map(({place_id,description})=>(<ComboboxOption key={place_id} value={description} ></ComboboxOption>))} 
            </ComboboxPopover>
        </Combobox>
    )
}

export default SearchBox