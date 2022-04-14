import React from 'react';
import Header from '../components/Header'
import { LockClosedIcon } from '@heroicons/react/solid';
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
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
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

export default Login