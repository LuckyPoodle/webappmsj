import React from 'react'
import Header from '../components/Header'

import { loadIdToken } from '../auth/firebaseAdmin'
import FirebaseAuth from '../components/firebaseAuth'
const Login = () => {
  return (
    <div>
      <Header />
      <div className='p-6 h-screen flex flex-col items-center justify-center text-center '>
        <div className='w-full'>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <div className='pt-5'>
              <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 '>
                Sign in/ Sign up
              </h2>
            </div>

            <FirebaseAuth />
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ req, res }) => {
  try {
    const uid = await loadIdToken(req)

    if (uid) {
      res.setHeader('location', '/dashboard/#shop')
      res.statusCode = 302
      res.end()
    }
  } catch (err) {
    console.log('ERROR DIRECTING TO DASHBOARD/LOGIN')
    console.log(err)
    res.setHeader('location', '/')
    res.statusCode = 302
    res.end()
  }
  return { props: {} }
}

export default Login
