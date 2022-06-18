import React, { useEffect } from 'react'
import DashboardBox from './DashboardBox'
import { ShopFilled, EditFilled, ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/outline'


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const optionsOrders = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Orders (2022)',
    },
  },
};
export const optionsRevenue = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Revenue (2022)',
    },
  },
};


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', "November", "December"];




const DashboardOverview = ({ total, monthlyOrderCount, monthlyRevenueCount, totalCompletedOrders, totalCompletedRevenue, totalOrders, totalRevenuePendingCompletion }) => {



  const dataOrders = {
    labels,
    datasets: [
      {
        label: 'Monthly Order',
        data: monthlyOrderCount,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },

    ],
  };

  const dataRevenue = {
    labels,
    datasets: [
      {
        label: 'Monthly Revenue',
        data: monthlyRevenueCount,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ]
  }





  return (
    <div className='container flex flex-wrap'>

      <div class="flex-initial w-full h-full sm:w-1/2 sm:h-1/2">
        <><Bar options={optionsOrders} data={dataOrders} /></>
        <>
          <div className='flex-initial w-1/3 '>
            <div className='flex-col'>
              <p>Total Number Of Orders: {totalOrders}</p>
            </div>

          </div>
        </>

      </div>

      <div class="flex-initial w-full h-full sm:w-1/2 sm:h-1/2">
        <><Bar options={optionsRevenue} data={dataRevenue} /></>
        <><div className='flex-initial w-1/3 '>  <p>Total Revenue: ${total}</p></div></>
      </div>
      <div class="flex-initial w-full h-full sm:w-1/2 sm:h-1/2">
          <div className=' p-5 shadow-md '>
            <div className='flex flex-col'>
                <h3 className='font-bold text-center'>Shop Orders</h3>
                <p>Order number 123456 ------ $1000 ----- Submitted</p>

            </div>
          </div>
      </div>
  
    </div>

  )
}

export default DashboardOverview;
