import React, { useEffect,useState } from 'react';
import { loadIdToken } from "../../auth/firebaseAdmin";
import Header from "../../components/Header"
import  { useRouter} from "next/router";
import { Fragment } from 'react';
import axios from "axios";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import DashboardOverview from '../../components/dashboardrelated/DashboardOverview';
import ShopDashboardOverview from '../../components/dashboardrelated/ShopDashboardOverview';

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



function Dashboard({shopData}) {

const router=useRouter();


const [renderWindow, setRenderWindow] = useState(false); /// condition that code only run client-side 
const [current, setCurrent] = useState("");  ///current selected nav item 
const [clickedOnNav,setClickedOnNav]=useState(false)  /// state useEffect that adjust current depends on 
 
//this only run on mount 
  useEffect(() => {
    setRenderWindow(true);
    setClickedOnNav(true); 

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
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            onClick={()=>{setClickedOnNav(!clickedOnNav)}}
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.href==current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.href==current? 'page' : undefined}
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
                    <a href={item.href}  onClick={()=>{setClickedOnNav(!clickedOnNav)}}> <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.href==current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.href==current? 'page' : undefined}
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
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0">
              {/* <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                
                        {current=='#overview'?
                        <DashboardOverview  total={100} totalCompletedOrders={90}/>:current=='#shop'?<h1>shop</h1>:<h1>Other</h1>}
                </div> */}
                 {current=='#overview'?
                        <DashboardOverview  total={100} totalCompletedOrders={90}/>:current=='#shop'?<ShopDashboardOverview shopData={shopData} />:<h1>Other</h1>}
              
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>

       
        </div>
    );
}




export const getServerSideProps=async ({ req, res }) => {
    const uid = await loadIdToken(req);

    const { data } = await axios.get(`${process.env.api}/get-shop-details-for-owner`, {
      headers: {
        token: req.cookies.token,
      },
    });

    console.log('data is ==>');
    console.log(data)

  
    if (!uid) {
      res.setHeader("location", "/login");
      res.statusCode = 302;
      res.end();
    }


  
    return { props: {shopData:data} };
  };
  

export default Dashboard