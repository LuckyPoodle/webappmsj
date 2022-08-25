import React, { useEffect,useState } from 'react';
import usePlacesAutocomplete,{getGeocode,getLatLng} from 'use-places-autocomplete';

import {Combobox,ComboboxInput,ComboboxPopover,ComboboxOption} from "@reach/combobox"
import "@reach/combobox/styles.css"

import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  libraries: ["places"]
});




const SearchBox = ({onSelectAddress,defaultValue,searchBoxText}) => {

  const [loaded,setLoaded]=useState(false);

  useEffect(()=>{
    loader
    .load()
    .then((google) => {

      setLoaded(true);
    
    })
    .catch(e => {

      setLoaded(false)
    });
  })

  
  return (
   loaded? <ReadySearchBox onSelectAddress={onSelectAddress} defaultValue={defaultValue } searchBoxText={searchBoxText}/>:<span className='text-xs text-gray-600'>loading</span>
  )





 
}

function ReadySearchBox({onSelectAddress,defaultValue,searchBoxText}){
    const {ready,value,setValue,suggestions:{status,data},clearSuggestions}=usePlacesAutocomplete({debounce:300,defaultValue,cache: 24 * 60 * 60,
      requestOptions: {
        types: ["address"],
        componentRestrictions: {
          country: ["sg"],
        }}
      /* Define search scope here */
    });

    //when user picks one
    const handleSelect=async(address)=>{
      setValue(address,false); //false is for shouldFetchData as we already hav the data 
      clearSuggestions();

      try{

        //we took the address, want to get the lat and long from it
        const results=await getGeocode({address});
        const {lat,lng}=await getLatLng(results[0]);
 

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
            id="search" className="w-full z-50 p-2 outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm  border-gray-300 rounded-md"
             value={value} onChange={handleChange} disabled={!ready} 
              placeholder={searchBoxText} autoComplete="off"  />

            <ComboboxPopover className='z-50'>
               {status==="OK" && data.map(({place_id,description})=>(<ComboboxOption  key={place_id} value={description} ></ComboboxOption>))} 
            </ComboboxPopover>
        </Combobox>
    )
}

export default SearchBox