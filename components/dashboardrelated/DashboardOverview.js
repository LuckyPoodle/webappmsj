import React from 'react'
import DashboardBox from './DashboardBox'
import { ShopFilled,EditFilled,ShoppingBagIcon,UserCircleIcon } from '@heroicons/react/outline'

const DashboardOverview =({total,totalCompletedOrders})=>{

    const defaultStats = [
        {
          title: 'Total Products in Shop',
          icon: <ShopFilled />,
          color: '#e9b949',
          bcg: '#fcefc7',
          data:''
      
        },
      
        {
          title: 'Total Revenue',
          icon: <EditFilled />,
          color: '#e9b949',
          bcg: '#fcefc7',
          data:total
    
     
        },
        {
          title:'Total Completed Orders',
          icon:<ShoppingBagIcon/>,
          color: '#e9b949',
          bcg: '#fcefc7',
          data:totalCompletedOrders
    
    
        },
        {
          title:'Best Selling Product',
          icon:<ShoppingBagIcon/>,
          color: '#e9b949',
          bcg: '#fcefc7',
          data:'Chocolate Chip Cookies (Bag)'
    
    
        },
        {
          title: 'Total Customers',
          icon: <UserCircleIcon/>,
          color: '#e9b949',
          bcg: '#fcefc7',
          data:'150'
    
     
        },
        // {
        //   title: 'My Orders',
        //   icon: <ShoppingCartOutlined/>,
        //   color: '#647acb',
        //   bcg: '#e0e8f9',
        
        // },
      ]
  return (
    <div className='grid gap-y-2 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 ' >
         {defaultStats.map((item, index) => {
        return <DashboardBox key={index} {...item} />
      })}  
    </div>
  )
}

export default DashboardOverview;
