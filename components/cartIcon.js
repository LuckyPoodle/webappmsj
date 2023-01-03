import React from 'react'

import { useState, useContext } from 'react'
import Link from 'next/link'
import { ShoppingBagIcon } from '@heroicons/react/outline'
import { Context } from '../context'
const CartIcon = () => {
  const {
    state: { accumulatedCartQty },
    dispatch,
  } = useContext(Context)

  return (
    <div className='container flex justify-content-center p-1'>
      <Link href='/cart'>
        <ShoppingBagIcon className='h-6 w-6 text-white' />
      </Link>
      <span className='text-sm text-white'> {accumulatedCartQty} </span>
    </div>
  )
}

export default CartIcon
