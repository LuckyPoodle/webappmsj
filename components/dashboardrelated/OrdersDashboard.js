import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { axiosAuth } from "../../actions/axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import toast, { Toaster } from 'react-hot-toast';
////TO DO: click on button in card to visit shop page.
const OrdersDashboard = ({ shopId }) => {

  const notify = (message, success) => toast(message, {
    style: {
      border: success ? '1px solid green' : '1px solid red',
    },
  });



  const [orderPurchasedView, setOrderPurchasedView] = useState(true);
  const [shopOrders, setShopOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(false);




  async function handleOrderStatusChange(e, shopOrderId) {
    setLoading(true);
    //update UI
    let indexoforder = shopOrders.findIndex((order) => order._id === shopOrderId);
    let newshopOrders = shopOrders;
    newshopOrders[indexoforder].orderStatus = e.target.value;


    const { data } = await axiosAuth.post(`/update-order-status/${shopOrderId}`, {
      orderStatus: e.target.value
    });
    setShopOrders(newshopOrders);
    if (data.ok == true) {

      notify('Updated Successfully', true)
    } else {
      notify('Something went wrong. Please contact customer service', false)
    }

    setLoading(false);
  }


  function toggleOrderView() {
    setOrderPurchasedView(!orderPurchasedView);
    getShopOrders()
  }

  async function getShopOrders() {
    try{
      setLoading(true)
    const { data } = await axiosAuth.get(`/get-shop-orders/${shopId}`, {});
    setShopOrders(data);
    setLoading(false)
    }catch(err){
       
       setLoading(false)
    }


  }

  async function getUserOrders() {
    try{
      setLoading(true)
    const { data } = await axiosAuth.get('/get-user-orders', {});
    setUserOrders(data);
    setLoading(false)
    }catch(e){
      setLoading(false)
    }

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
     
            <p className='font-bold text-lg'>Your Purchases</p>
            <div className=''>
              <div class="flex flex-wrap h-full">
                {userOrders.length>0?userOrders.map((order) => {
                  return <>

                    <div class=" flex-initial pt-10 w-full h-full ">
                      <div className='relative p-5 shadow-md '>
                        <div className='flex flex-col items-center p-5'>
                          <span className='font-bold'> Order Id - {order._id}</span>
                          <p><span className='font-bold'>Order Value </span>: S${order.orderRevenue}</p>
                          <p><span className='font-bold'>Order Status </span>: {order.orderStatus}</p>
                          <p><span className='font-bold'>Payment Method </span>:{order.paymentMethod}</p>
                          <p><span className='font-bold'>Delivery Or Pickup</span>:{order.delivery ? 'Delivery' : 'Pickup'}</p>
                          <p><span className='font-bold'>Order Date </span>:{new Date(order.createdAt).toLocaleDateString(
                            'en-gb',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }
                          )}</p>
                          <p><span className='font-bold'>Products: </span></p>
                          {order.shopProductsInOrder.map((pdt) => {
                            return <span>{pdt.name} ${pdt.price} --- {pdt.shopName}</span>
                          })}

                          <button className='bg-indigo-500 p-2 text-white w-1/4 rounded text-center italic'>    <Link href={`/${order.shopProductsInOrder[0].shopSlug}`} ><a className="">View Shop</a></Link></button>


                        </div>

                      </div>
                    </div>



                  </>
                }):<div className='p-10'><p>You have not purchased anything yet!</p></div>}
              </div>
            </div>
          </> : <>

            <p className='font-bold text-lg'>Your Shop Orders</p>
            {loading ? <div className='animate-spin h-5 w-5 mr-3 '>
              <FontAwesomeIcon icon={faSpinner} />
            </div> :
              <div className=''>
                <div class="flex flex-wrap h-full">

                  {shopOrders.length>0?shopOrders.map((order) => {
                    return <>

                      <div class=" flex-initial pt-10 w-full h-full ">
                        <div className='relative p-5 shadow-md '>
                          <div className='flex flex-col items-center'>
                            <span className='font-bold'> Order {order._id}</span>
                            <p><span className='font-bold'>Order Value </span>: S${order.orderRevenue}</p>
                            <p><span className='font-bold'>Order Date</span>:{new Date(order.createdAt).toLocaleDateString(
                            'en-gb',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }
                          )}</p>
                            <p><span className='font-bold'>Order Status </span>:    <select
                              style={{ width: "50%" }}
                              size="large"
                              required
                              value={order.orderStatus}
                              name="orderStatus"
                              defaultValue={order.orderStatus}
                              onChange={(e) => handleOrderStatusChange(e, order._id)}
                              className='text-gray-900 '
                            >

                              <option value={'Order Submitted'}  >Order Submitted</option>
                              <option value={"Order Paid"}  >Order Paid</option>
                              <option value={"Processing"}  >Processing</option>
                              <option value={"Completed"}  >Completed</option>
                              <option value={"Cancelled"}  >Cancelled</option>

                            </select></p>

                            <p><span className='font-bold'>Payment Method </span>:{order.paymentMethod}</p>
                            <p><span className='font-bold'>Customer Number </span>:{order.deliveryContactNumber}</p>
                            <p><span className='font-bold'>Delivery Or Pickup</span>:{order.delivery ? 'Delivery' : 'Pickup'}</p>
                            <p><span className='font-bold'>Products In Order :</span></p>
                            {order.shopProductsInOrder.map((pdt) => {
                              return <span>{pdt.name} ${pdt.price}</span>
                            })}

                          </div>
                          {order.paymentMethod === 'Credit' ? <button className='bg-indigo-500 p-2 m-2 text-white w-50 h-50 rounded text-center italic'>Card Payment: Submit Refund Request</button> : <></>}

                        </div>
                      </div>



                    </>
                  }):<div className='p-10'><span>You have not sold anything yet!</span></div>}
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