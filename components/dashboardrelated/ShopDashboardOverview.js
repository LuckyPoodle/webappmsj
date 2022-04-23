/* This example requires Tailwind CSS v2.0+ */
import { PaperClipIcon } from '@heroicons/react/solid'
import { useEffect,useState } from 'react'
import RegisterShopForm from '../forms/RegisterShop';
import ShopDetails from '../ShopDetails';
import { Context } from '../../context/index';
import { useContext } from 'react';
import ProductsDetailsDashboard from '../ProductsDetailsDashboard';



const ShopDashboardOverview=({shopData})=> {


  const {state:{dashboardShowProductsDetails}}=useContext(Context);


  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
     {
       dashboardShowProductsDetails?<ProductsDetailsDashboard />:shopData[0].owner.ownShop?<ShopDetails shopData={shopData} />: /* Start Shop Form */

       <>
       <div>
       
         <div className="">
 
         <RegisterShopForm  />
           
         </div>
       </div>
     </>

     
     }
    </div>
  )
}

export default ShopDashboardOverview