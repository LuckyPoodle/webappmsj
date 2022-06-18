import React, { useEffect, useState } from 'react';
import { loadIdToken } from "../../auth/firebaseAdmin";
import Header from "../../components/Header"
import { useRouter } from "next/router";

import axios from "axios";
import { axiosAuth } from '../../actions/axios';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import DashboardOverview from '../../components/dashboardrelated/DashboardOverview';
import ShopDashboardOverview from '../../components/dashboardrelated/ShopDashboardOverview';
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
import { passThroughSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';

const navigation = [
  { name: 'Dashboard', href: '#overview', current: true },
  { name: 'My Shop', href: '#shop', current: false },
  { name: 'Orders', href: '#orders', current: false },
  { name: 'Mailbox', href: '#mailbox', current: false },
  { name: 'Settings', href: '#settings', current: false },

]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



function Dashboard({ shopData }) {

  const router = useRouter();


  const [renderWindow, setRenderWindow] = useState(false); /// condition that code only run client-side 
  const [current, setCurrent] = useState("#overview");  ///current selected nav item 
  const [clickedOnNav, setClickedOnNav] = useState(false)  /// state useEffect that adjust current depends on 
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCompletedRevenue, setTotalCompletedRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCompletedOrders, setTotalCompletedOrders] = useState(0);
  const [totalRevenuePendingCompletion, setTotalRevenuePendingCompletion] = useState(0);
  const [totalOrdersPendingCompletion,setTotalOrdersPendingCompletion]=useState(0);

  const [monthlyOrderCount, setMonthlyOrderCount] = useState([]);
  const [monthlyRevenueCount,setMonthlyRevenueCount]=useState([])

  const getMonthlyOrderCount = (list) => {
    try{
      console.log('IN MONTHLY COUNT!!!!');
    console.log(list)
    let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let monthorderresults=[]
    let monthrevenueresults=[]
    months.forEach(month => {
      const item = list.find(item => item._id === month);
      
      if (item) {
        monthorderresults.push(item.numberoforders);
        monthrevenueresults.push(item.monthrevenue);
      } else {
        monthorderresults.push(0);
        monthrevenueresults.push(0);
      }
    })
    console.log('monthly ordrcount!!!jahahahahah');
    console.log(monthorderresults);
    console.log(monthrevenueresults)
    setMonthlyOrderCount(monthorderresults);
    setMonthlyRevenueCount(monthrevenueresults);
    }catch(err){
      alert(err)
    }
    
  }




  const getAccountStatistics = () => {
    axiosAuth.get(`/get-statistics/${shopData[0]._id}`).then((res) => {
      console.log('RESPONSE BACK FROM GET ACCT');
      console.log(res.data)
      console.log('count of order????');
      console.log(res.data.totalCount)

      if (res.data.ok) {
        setTotalRevenue(res.data.totalRevenue);
        setTotalCompletedRevenue(res.data.completedRevenue.totalCompletedRevenue);
        setTotalOrders(res.data.totalCount)
        setTotalCompletedOrders(res.data.completedRevenue.totalCompletedCount)
        let revenuepending = res.data.totalRevenue - res.data.completedRevenue.totalCompletedRevenue;
        console.log('montly order count ======');
        console.log(res.data.monthlyOrderCount)
        setTotalRevenuePendingCompletion(revenuepending);
        getMonthlyOrderCount(res.data.monthlyOrderCount,true);





      }
    }).catch((err) => {

    })


  }

  //this only run on mount 
  useEffect(() => {
    console.log('Obtained ShopData ==========>');
    console.log(shopData)
    setRenderWindow(true);
    setClickedOnNav(true);
    getAccountStatistics();
  }, []);


  useEffect(() => {

    console.log('hey clickedOnNav changed!!!!!');
    console.log('current hash is ');
    console.log(window.location.hash)
    setCurrent(window.location.hash);



  }, [clickedOnNav]);






  return (
    <div>
      <Header />

      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">

                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            onClick={() => { setClickedOnNav(!clickedOnNav) }}
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.href == current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.href == current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* <button
                        type="button"
                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button> */}


                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <a href={item.href} onClick={() => { setClickedOnNav(!clickedOnNav) }}> <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.href == current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.href == current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button></a>
                  ))}
                </div>

              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">{current}</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

            <div className="px-4 py-6 sm:px-0">
              {/* <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                
                        {current=='#overview'?
                        <DashboardOverview  total={100} totalCompletedOrders={90}/>:current=='#shop'?<h1>shop</h1>:<h1>Other</h1>}
                </div> */}
              {current == '#overview' ?
                <DashboardOverview  monthlyRevenueCount={monthlyRevenueCount} monthlyOrderCount={monthlyOrderCount}  total={totalRevenue} totalCompletedOrders={totalCompletedOrders} totalOrders={totalOrders} totalCompletedRevenue={totalCompletedRevenue} totalRevenuePendingCompletion={totalRevenuePendingCompletion} /> : current == '#shop' ? <ShopDashboardOverview shopData={shopData} /> : <h1>Other</h1>}

            </div>

          </div>
        </main>
      </div>


    </div>
  );
}




export const getServerSideProps = async ({ req, res }) => {
  try {
    const uid = await loadIdToken(req);
    console.log('uid is ===>')
    console.log(uid)
    console.log('req token cookies');
    console.log(req.cookies.token)
    if (!uid) {
      res.setHeader("location", "/login");
      res.statusCode = 302;
      res.end();
    }
    const { data } = await axios.get(`${process.env.api}/get-shop-details-for-owner`, {
      headers: {
        token: req.cookies.token,
      },
    });
    console.log('data is ==>');
    console.log(data);
    return { props: { shopData: data } };
  } catch (err) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
  }
};


export default Dashboard