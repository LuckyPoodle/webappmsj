import Image from 'next/image'
function Banner() {
    return (
  
      <div className="relative h-[150px] sm:h-[250px] lg:h-[350px] xl:h-[450px] 2xl:h-[550px]">
  
        <Image
          src="https://media.publit.io/file/decor/Keep-Calm-E-Shop-With-Us-851-x-315-px.jpeg"
          layout="fill"
          objectFit="cover"
        />
                  {/*  absolute positioning to the container parent which must be relative.   */}
        <div className="absolute top-1/2 w-full text-center">
          {/* <p className="text-sm sm:text-lg">Not sure where to go? Perfect.</p>
          <button className="px-10 py-4 my-3 font-bold bg-white shadow-md rounded-full text-purple-500 active:scale-90 transition duration-150 transform hover:shadow-xl">
            I'm flexible
          </button> */}
        </div>
      </div>
    );
  }
  
  export default Banner;
  