import React from 'react';
import Header from '../components/Header'

import { loadIdToken } from "../auth/firebaseAdmin";
import FirebaseAuth from '../components/firebaseAuth'
const Login = () => {
  return (

   <div >
     <Header />
     <div className="p-6 h-screen flex flex-col items-center justify-center text-center ">
        <div className="w-full">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://res.cloudinary.com/delhozzsh/image/upload/v1648724247/makeshipjoy_1_wecqeg.png"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in/ Sign up</h2>

          </div>

          <div className=''>
            <FirebaseAuth/></div>

          
        </div>
      </div>
   </div>
  )
}

export const getServerSideProps=async ({ req, res }) => {
  try{
  const uid = await loadIdToken(req);
  console.log('uid is ===>')
  console.log(uid)
  console.log('req token cookies');
  console.log(req.cookies.token)
  if (uid) {
    res.setHeader("location", "/dashboard/#shop");
    res.statusCode = 302;
    res.end();
  }
  

  }catch(err){
    console.log("ERROR DIRECTING TO DASHBOARD/LOGIN");
    console.log(err)
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
  }
  return { props: {} };
};

export default Login