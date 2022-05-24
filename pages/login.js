import React from 'react';
import Header from '../components/Header'
import { LockClosedIcon } from '@heroicons/react/solid';
import { loadIdToken } from "../auth/firebaseAdmin";
import FirebaseAuth from '../components/firebaseAuth'
const Login = () => {
  return (

   <div >
     <Header />
     <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://res.cloudinary.com/delhozzsh/image/upload/v1648724247/makeshipjoy_1_wecqeg.png"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in/ Sign up</h2>
          
          </div>
          <FirebaseAuth/>
          
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