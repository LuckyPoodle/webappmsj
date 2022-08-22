import Image from 'next/image'
function Banner() {
    return (
  
      <div className="relative h-[150px] sm:h-[250px] lg:h-[350px] xl:h-[450px] 2xl:h-[550px]">
  
        <Image
          src="https://media.publit.io/file/shopping-j.jpeg"
          layout="fill"
          objectFit="cover"
        />
                  {/*  absolute positioning to the container parent which must be relative.   */}
        <div className="absolute top-1/2 w-full text-center">
        
          <button className="md:px-10 md:py-4 md:my-3 px-5 py-2 my-1 font-bold bg-white shadow-md rounded-full text-black active:scale-90 transition duration-150 transform hover:shadow-xl">
            What's near me?
          </button>
        </div>
      </div>
    );
  }
  
  export default Banner;
  