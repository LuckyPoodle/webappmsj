import { useEffect,useState } from 'react';
const contentful = require("contentful");
import Image from 'next/image'

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.contentfulspaceid,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken:process.env.contentfulaccesstoken
});

function Hero () {

  const [herosentries,setHerosentries]=useState([]);

  useEffect(()=>{
    console.log('in Hero UseEffect');
    console.log(process.env.contentfulspaceid);
    let tempArray=[];

    client.getEntries()
.then((response) => {
  //console.log(response.items[0].fields.image.fields.file.url.slice(2))
  response.items.forEach(item=>{
    let tempHeroobject={};
    tempHeroobject={title:item.fields.title,description:item.fields.description,image:"https://"+item.fields.image.fields.file.url.slice(2)}
    print(tempHeroobject)
    tempArray.push(tempHeroobject)
  });
  console.log('tempArray');
  console.log(tempArray)
  setHerosentries(tempArray);

}


)
.catch(console.error)


  },[]);

  


  return (

    <div className='relative'>
      <div className="carousel w-full">
       
      {herosentries?   herosentries.map(function(object, i){
        return <div id={i} className="carousel-item relative w-full h-[500px]">
        <img src={object.image} className="w-full object-cover" />  
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href={`#${i-1}`} className="btn btn-circle">❮</a> 
          <a href={`#${i+1}`} className="btn btn-circle">❯</a>
        </div>
      </div> 
    }):<h1>hi!!!!!!!!!!!!!!!!!!!!!!!!</h1>}
    
     </div>

     <div className='absolute top-1/2 w-full text-center'>
       <button className="px-10 py-4 my-3 font-bold bg-white shadow-md rounded-full text-purple-500 active:scale-90 transition duration-150 transform hover:shadow-xl">
             Find Goodies Near Me
        </button>
       </div>
    </div>
  )
}

export default Hero;