import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'

import { useState, useContext } from 'react';
import Link from 'next/link';
import { ShoppingBagIcon } from '@heroicons/react/outline'
import { Context } from '../context';
const CartIcon = () => {

    const { state: { accumulatedCartQty }, dispatch } = useContext(Context);
    




    return (


               <div className='container flex justify-content-center p-1'>
               
                <Link href="/cart" >
                <ShoppingBagIcon className='h-6 w-6 text-white'  />
         
                </Link>
                <span class='text-sm text-white'> {accumulatedCartQty} </span>
               </div>
    
    )
}

export default CartIcon
