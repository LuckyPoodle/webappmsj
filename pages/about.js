import React from 'react'
import Header from '../components/Header'

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className='bg-gray-100 h-screen'>
        <div className='container p-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <p className='font-bold'>About SMALLSHOPS</p>
          <p>
            I built SMALLSHOPS because I enjoy staying at home to accompany my
            dog, Dylan, who loves staying at home too. Dylan told me once how
            nice it would be if he could start a home-based business to sell to
            his buddies in our neighbourhood. Hence, SMALLSHOPS is created.
            --Kory{' '}
          </p>
        </div>
      </div>
    </>
  )
}

export default AboutUs
