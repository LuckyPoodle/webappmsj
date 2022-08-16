import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { axiosAuth } from "../../actions/axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

////TO DO: click on button in card to visit shop page.
const OrdersDashboard = ({ shopId }) => {

  const [orderPurchasedView, setOrderPurchasedView] = useState(true);
  const [shopOrders, setShopOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([])
  const [loading, setLoading] = useState(false)


  function toggleOrderView() {
    setOrderPurchasedView(!orderPurchasedView);
    getShopOrders()
  }

  async function getShopOrders() {
    setLoading(true)
    const { data } = await axiosAuth.get(`/get-shop-orders/${shopId}`, {});
    setShopOrders(data);
    setLoading(false)


  }

  async function getUserOrders() {
    setLoading(true)
    const { data } = await axiosAuth.get('/get-user-orders', {});
    setUserOrders(data);
    setLoading(false)

  }

  useEffect(() => {

    getUserOrders();
    getShopOrders();


  }, [])










  return (
    <div className='h-full'>
      <button onClick={toggleOrderView} type="button" class="text-white p-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{orderPurchasedView ? 'View Shop Orders' : 'View Purchased Orders'}</button>
      <div className='col'>
        {
          orderPurchasedView ? <>
            <p>Your Purchased Orders!!</p>
        
           <div className=''>
           <div class="flex flex-wrap h-full">
              {userOrders.map((order) => {
                return <>

                  <div class=" flex-initial pt-10 w-full h-full sm:w-1/2 sm:h-1/2">
                    <div className='relative p-5 shadow-md '>
                      <div className='flex flex-col items-center p-5'>
                        <span className='font-bold'> Order Id - {order._id}</span>
                        <p><span className='font-bold'>Order Value </span>: S${order.orderRevenue}</p>
                        <p><span className='font-bold'>Order Status </span>: {order.orderStatus}</p>
                        <p><span className='font-bold'>Payment Method </span>:{order.paymentMethod}</p>
                        <p><span className='font-bold'>Delivery Or Pickup</span>:{order.delivery ? 'Delivery' : 'Pickup'}</p>
                        <p><span className='font-bold'>Order Date </span>:{order.createdAt}</p>
                        <p><span className='font-bold'>Products: </span></p>
                        {order.shopProductsInOrder.map((pdt)=>{
                          return <span>{pdt.name} ${pdt.price} --- {pdt.shopName}</span>
                        })}

<button className='bg-indigo-500 p-2 text-white w-1/4 rounded text-center italic'>    <Link href={`/${order.shopProductsInOrder[0].shopSlug}`} ><a className="">View Shop</a></Link></button>


                      </div>

                    </div>
                  </div>



                </>
              })}
            </div>
           </div>
          </> : <>

            <p>Your Shop Orders</p>
            {loading ? <div className='animate-spin h-5 w-5 mr-3 '>
              <FontAwesomeIcon icon={faSpinner} />
            </div> :
             <div className=''>
                <div class="flex flex-wrap h-full">
                  {JSON.stringify(shopOrders)}
                {shopOrders.map((order) => {
                  return <>

                    <div class=" flex-initial pt-10 w-full h-full sm:w-1/2 sm:h-1/2">
                      <div className='relative p-5 shadow-md '>
                        <div className='flex flex-col items-center'>
                          <span className='font-bold'> Order {order._id}</span>
                          <p><span className='font-bold'>Order Value </span>: S${order.orderRevenue}</p>
                          <p><span className='font-bold'>Order Status </span>: {order.orderStatus}</p>
                          <p><span className='font-bold'>Payment Method </span>:{order.paymentMethod}</p>
                          <p><span className='font-bold'>Delivery Or Pickup</span>:{order.delivery ? 'Delivery' : 'Pickup'}</p>
                          <p><span className='font-bold'>Products In Order :</span></p>
                          {order.shopProductsInOrder.map((pdt)=>{
                          return <span>{pdt.name} ${pdt.price}</span>
                        })}

                        </div>
                        {order.paymentMethod==='Credit'?<button className='bg-indigo-500 p-2 m-2 text-white w-50 h-50 rounded text-center italic'>Card Payment: Submit Refund Request</button>:<></>}
                        <button className='bg-indigo-500 p-2 m-2 text-white w-50 h-50 rounded text-center italic'>Update Order Status</button>
                      </div>
                    </div>



                  </>
                })}
              </div>
             </div>
              
              }




          </>
        }
      </div>


    </div>
  )
}

export default OrdersDashboard