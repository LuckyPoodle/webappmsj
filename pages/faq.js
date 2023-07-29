import React, { useState } from 'react'
import Header from '../components/Header'

const FAQ = () => {
  const [show, setShow] = useState(false)
  return (
    <div className='h-screen  '>
      <Header />

      <div className=' h-1/2  mb-10  mt-20 flex flex-col justify-center items-center '>
        <section className='pt-10' id='faq'>
          <div className='container mx-auto'>
            <h2 className='mb-6 text-3xl font-semibold text-center md:text-4xl'>
              Frequently Asked Questions
            </h2>
            <p className='max-w-lg px-6 mx-auto text-center text-graishBlue'>
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur
            </p>
          </div>
        </section>

        <div className='container pb-20 bg-white '>
          <section id='faq-accordion'>
            <div className='container mx-auto px-6 mb-32'>
              <div className='max-w-2xl m-8 mx-auto overflow-hidden'>
                <div className='py-1 border-b outline-none group' tabindex='1'>
                  <div className='flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease'>
                    <div className='transition duration-500 ease group-hover:text-red-500'>
                    vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                    </div>

                    <div className='transition duration-500 ease group-focus:-rotate-180 group-focus:text-red-500'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='18'
                        height='12'
                      >
                        <path
                          fill='none'
                          stroke='currentColor'
                          stroke-width='3'
                          d='M1 1l8 8 8-8'
                        />
                      </svg>
                    </div>
                  </div>

                  <div className='overflow-hidden transition duration-500 group-focus:max-h-screen max-h-0 ease'>
                    <p className='py-2 text-justify text-gray-400'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>

                <div className='py-1 border-b outline-none group' tabindex='2'>
                  <div className='flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease'>
                    <div className='transition duration-500 ease group-hover:text-red-500'>
                    vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                    </div>

                    <div className='transition duration-500 ease group-focus:-rotate-180 group-focus:text-red-500'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='18'
                        height='12'
                      >
                        <path
                          fill='none'
                          stroke='currentColor'
                          stroke-width='3'
                          d='M1 1l8 8 8-8'
                        />
                      </svg>
                    </div>
                  </div>

                  <div className='overflow-hidden transition duration-500 group-focus:max-h-screen max-h-0 ease'>
                    <p className='py-2 text-justify text-gray-400'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>

                <div className='py-1 border-b outline-none group' tabindex='3'>
                  <div className='flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease'>
                    <div className='transition duration-500 ease group-hover:text-red-500'>
                    vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                    </div>

                    <div className='transition duration-500 ease group-focus:-rotate-180 group-focus:text-red-500'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='18'
                        height='12'
                      >
                        <path
                          fill='none'
                          stroke='currentColor'
                          stroke-width='3'
                          d='M1 1l8 8 8-8'
                        />
                      </svg>
                    </div>
                  </div>

                  <div className='overflow-hidden transition duration-500 group-focus:max-h-screen max-h-0 ease'>
                    <p className='py-2 text-justify text-gray-400'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>

                <div className='py-1 border-b outline-none group' tabindex='4'>
                  <div className='flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease'>
                    <div className='transition duration-500 ease group-hover:text-red-500'>
                    vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                    </div>

                    <div className='transition duration-500 ease group-focus:-rotate-180 group-focus:text-red-500'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='18'
                        height='12'
                      >
                        <path
                          fill='none'
                          stroke='currentColor'
                          stroke-width='3'
                          d='M1 1l8 8 8-8'
                        />
                      </svg>
                    </div>
                  </div>

                  <div className='overflow-hidden transition duration-500 group-focus:max-h-screen max-h-0 ease'>
                    <p className='py-2 text-justify text-gray-400'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default FAQ
