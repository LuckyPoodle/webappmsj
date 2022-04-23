import Image from "next/image";
import Link from "next/link";
import  { useRouter} from "next/router";
import { AuthContext } from "../context/useAuth";
import firebase from "../auth/initFirebase";
import { useState ,useContext,useEffect} from "react";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon,SearchIcon } from '@heroicons/react/outline'

const navigation = [
  { name: 'About ', href: '#', current: false },
  { name: 'FAQ', href: '#', current: false },
  { name: 'Join', href: '#', current: false },

]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}




function Header({ placeholder }) {

  const {state:{authenticated,user},dispatch}=useContext(AuthContext);
  const router=useRouter();


  const [searchInput, setSearchInput] = useState("");
  const [clickedOnProfile, setClickedOnProfile] = useState(false);

  const handleLogoutClick=()=>{
    console.log('hi, in logout')

    firebase.auth().signOut().then(()=>{
      router.push('/');
    }).catch((e)=>{
        console.log(e);
    });
    dispatch({ type: 'LOGOUT' })
  }

  useEffect(()=>{

    console.log('in header ');
    console.log(authenticated);
    
    authenticated?console.log('is true'):console.log('is false')

  },[])

  return (
    <header className="sticky z-50 top-0 ">
      <Disclosure as="nav" className="bg-white">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center space-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* DESKTOP MENU */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">

                    <img
                      onClick={()=>router.push('/')}
                      className="block lg:hidden h-8 w-auto"
                      src="https://res.cloudinary.com/delhozzsh/image/upload/v1648724247/makeshipjoy_1_wecqeg.png"
                      alt="Workflow"
                    />
                    <img
                            onClick={()=>router.push('/')}
                      className="hidden lg:block h-8 w-auto"
                      src="https://res.cloudinary.com/delhozzsh/image/upload/v1648724247/makeshipjoy_1_wecqeg.png"
                      alt="Workflow"
                    />
                  </div>


                  {/*  DESKTOP MENU  */}
                  <div className=" hidden sm:block sm:ml-6">
                    <div className="flex w-full">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-black hover:bg-gray-700 hover:text-white',
                          'px-3 py-3 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                      <div className="grow h-14 items-center rounded-full md:shadow-sm py-2">
                        <input
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && search()}
                          placeholder={placeholder || "Search for anything"}
                          className="text-sm text-black pl-5 placeholder-gray-400 outline-none bg-transparent"
                        />
                        {/* flex-grow so can grow  */}
                        {/* hidden search icon, show only in medium screen */}
                        <SearchIcon className="h-8 hidden md:inline-flex p-2 mx-auto cursor-pointer md:mx-2 bg-red-400 rounded-full text-white" />
                      </div>
                     
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="bg-gray-800 p-1 rounded-full text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        
                      <Menu.Item>
                       
                       {
                        user? 
                       <span className="'block px-4 py-2 text-sm font-bold text-gray-700 '">{user.displayName}</span>: <span className="'block px-4 py-2  font-bold text-sm text-gray-700 '">Not Logged In</span>
                       }
                     </Menu.Item>
                        <Menu.Item>
                       
                          {({ active }) => (
                           authenticated? 
                          <Link href="/dashboard#overview">
                            <a className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 ')}>
                              Dashboard
                              </a></Link>: <Link
                              href="/login"
    
                            >
                              <a      
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 ')}>Sign In/Sign Up</a>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              onClick={handleLogoutClick}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>


            {/* MOBILE */}

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="flex items-center border-2 rounded-full md:shadow-sm py-2">
                        <input
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && search()}
                          placeholder={placeholder || "Search for anything"}
                          className="flex-1 w-300 text-sm text-gray-600 pl-5 placeholder-gray-400 outline-none bg-transparent"
                        />
                        {/* flex-grow so can grow  */}
                        {/* hidden search icon, show only in medium screen */}
                        <SearchIcon className="h-8 hidden md:inline-flex p-2 mx-auto cursor-pointer md:mx-2 bg-red-400 rounded-full text-white" />
                      </div>
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

    </header>
  )
  return (

    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:px-10">
      {/* in header, css theres break point. md:px-10 means at medium screen, apply padding 10  */}
      {/* Left  */}
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-10 my-auto cursor-pointer"
      >
        <Image
          src="https://res.cloudinary.com/delhozzsh/image/upload/v1648724247/makeshipjoy_1_wecqeg.png"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      {/* Search - middle section . flex by default go into a row, items-center to centralize items.  */}
      <div className="flex items-center md:border-2 rounded-full md:shadow-sm py-2">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder={placeholder || "Search for anything"}
          className="flex-grow text-sm text-gray-600 pl-5 placeholder-gray-400 outline-none bg-transparent"
        />
        {/* flex-grow so can grow  */}
        {/* hidden search icon, show only in medium screen */}
        <SearchIcon className="h-8 hidden md:inline-flex p-2 mx-auto cursor-pointer md:mx-2 bg-red-400 rounded-full text-white" />
      </div>
      {/* Right */}
      <div className="flex items-center text-gray-500 justify-end space-x-4">
        <p className="cursor-pointer hidden md:inline">Start Your Business</p>
        <GlobeAltIcon className="h-6 cursor-pointer hidden sm:inline" />

        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon onClick={(e) => setClickedOnProfile(!clickedOnProfile)} className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>
      {/* profile dropdown */}
      {clickedOnProfile && (
        <div className="origin-bottom-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1">
          <p>Setting</p>
        </div>
      )}


    </header>
  );
}

export default Header;
