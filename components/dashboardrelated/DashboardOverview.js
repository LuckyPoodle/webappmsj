import React, { useEffect } from 'react'
import DashboardBox from './DashboardBox'
import {
  ShopFilled,
  EditFilled,
  ShoppingBagIcon,
  UserCircleIcon,
} from '@heroicons/react/outline'
import Link from 'next/link'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

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
}
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
}

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const DashboardOverview = ({
  purchasedProducts,
  orders,
  shopTitle,
  total,
  monthlyOrderCount,
  monthlyRevenueCount,
  totalOrdersPendingCompletion,
  totalCompletedOrders,
  totalCompletedRevenue,
  totalOrders,
  totalRevenuePendingCompletion,
}) => {
  useEffect(() => {
    console.log('PROCESS ENV API ')
    console.log(process.env.api)
  })

  const dataOrders = {
    labels,
    datasets: [
      {
        label: 'Monthly Order',
        data: monthlyOrderCount,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  const dataRevenue = {
    labels,
    datasets: [
      {
        label: 'Monthly Revenue',
        data: monthlyRevenueCount,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <div className='container flex flex-wrap'>
      <div class=' flex-initial w-full h-full sm:w-1/2 sm:h-1/2 p-2'>
        <div className='flex-initial w-1/3 text-sm italic'>
          {shopTitle ? (
            <p>
              Total Number Of {shopTitle} Orders: {totalOrders}
            </p>
          ) : (
            <p>User has no shop yet</p>
          )}
        </div>
        <>
          <Bar options={optionsOrders} data={dataOrders} />
        </>
        <>
          <div className='flex-initial w-1/3 '></div>
        </>
      </div>

      <div class=' flex-initial w-full h-full sm:w-1/2 sm:h-1/2'>
        <div className='flex-initial w-1/3 text-sm italic '>
          {' '}
          {shopTitle ? (
            <p>
              Total Revenue for {shopTitle}: ${total}
            </p>
          ) : (
            <p>User has no shop yet</p>
          )}
        </div>
        <>
          <Bar options={optionsRevenue} data={dataRevenue} />
        </>
      </div>
      <div class=' flex-initial pt-10 w-full h-full sm:w-1/2 sm:h-1/2'>
        <div className=' p-5 shadow-md '>
          <div className='flex flex-col items-center'>
            <span>{shopTitle ? shopTitle : 'User has no shop yet'}</span>
            <h3 className='font-bold text-center mb-5'>
              {totalOrdersPendingCompletion} Orders pending completion
            </h3>
            {/* <button className='bg-indigo-500 p-2 text-white w-1/4 rounded text-center'><Link href="/dashboard#orders"><a>View Shop Orders</a></Link></button> */}
          </div>
        </div>
      </div>
      <div class=' flex-initial pt-10 w-full h-full sm:w-1/2 sm:h-1/2'>
        <div className=' p-5 shadow-md '>
          <div className='flex flex-col items-center'>
            <span> Your Purchased Orders</span>
            <h3 className='font-bold text-center mb-5'>
              {orders.length} Purchased Orders
            </h3>
            {/* <button className='bg-indigo-500 p-2 text-white w-1/4 rounded text-center'><Link href="/dashboard#orders"><a>View Purchases</a></Link></button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview
