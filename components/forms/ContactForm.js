import React, { useState } from 'react'

const ContactForm=()=>{



    return <Container>

<form className="mx-auto max-w-xl py-4 text-white" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-xl"> Contact </h1>

           
 

        
   
           
         
           <div className="mt-4">
            <label htmlFor="T" className="block">
              
            </label>
            <input
              id="bedrooms"
              name="bedrooms"
              type="number"
              className="p-2"
              {...register("bedrooms",{ min: {value:0,message:"Cannot have negativity"}, max: {value:99,message:"Max reached"} })}
            />
            {errors.bedrooms? <p>{errors.bedrooms.message}</p>:<></>}
       
          </div>

          <div className="mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded" type="submit" disabled={submitting}>Save</button>
            {" "}
          </div>
          <Link href="/"><a>Cancel</a></Link>
</>
          )}
           

     
    </form>

    </Container>



}