import React, { useEffect, useContext,useState } from 'react';
import Header from '../components/Header';
import { axiosAuth } from '../actions/axios';
import { AuthContext } from "../context/useAuth";
import { Context } from '../context'
import { useRouter } from "next/router";

const Cart = () => {

    const router = useRouter();

    const { state: { cartItems }, dispatch } = useContext(Context);
    const { state: { authenticated, user }, } = useContext(AuthContext);
    const [totalPrice,setTotalPrice]=useState(0);

    useEffect(()=>{
        console.log('********************* CART *********************');
        console.log(history)

    },[])


    const saveCartToDB=async()=>{
        console.log(totalPrice)
        if (!authenticated || user==null){
            console.log('LOGIN FIRST')
            history.push('/login')
        }else{
            console.log('SEND CART TO SERVER')
          axiosAuth.post(`/cart`,{cartItems,totalPrice}).then((res)=>{
              console.log('RESPONSE BACK FOR SAVING CART');
              console.log(res.data)

                if (res.data.ok){
                    console.log('ok is true!!!')
                    router.push("/checkout");
                    
                }
            }).catch((err)=>{
                
            })
        }
        
    }

    useEffect(()=>{
        console.log('cart items!!!!')
        console.log(cartItems)
        let price=0;

        cartItems.map((item)=>{
            console.log(item.mainImage);
            price=price+item.inclusivePrice
            console.log(price)
        });

        setTotalPrice(price);

    },[]);


   

    const handlePrdtRemove=(product)=>{
        //deduct from totalprice
        let price=totalPrice-product.inclusivePrice;
        setTotalPrice(price)

        dispatch({
            type: "REMOVEFROMCART",
            payload: product,
          });

       


    }

    return (
        <>
            <Header />


            <div className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0" id="chec-div">
                <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
                    <div className="flex md:flex-row flex-col justify-end" id="cart">
                        <div className="w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen" id="scroll">

                            <p className="text-5xl font-black leading-10 text-gray-800 pt-10">Bag</p>
                          
                            {cartItems.map((item)=>
                                <div className="md:flex items-center mt-14 py-8 border-t border-gray-200">
                                <div className="w-1/4">
                                    <img src={item.mainImage} alt className="w-full h-full object-center object-cover" />
                                </div>
                                <div className="md:pl-3 md:w-3/4">
                                    <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">{item.shop.shopTitle}</p>
                                    <div className="flex items-center justify-between w-full pt-1">
                                        <p className="text-base font-black leading-none text-gray-800">{item.name}</p>
                                     
                                    </div>
                                   
                                    <div className="flex items-center justify-between pt-5 pr-6">
                                        <div className="flex itemms-center">
                                           
                                            <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer" onClick={()=>handlePrdtRemove(item)}>Remove</p>
                                        </div>
                                        {item.deliveryAvailable?<p>Includes Shop Delivery</p>:<></>}
                                        <p className="text-base font-black leading-none text-gray-800">${item.inclusivePrice}</p>
                                    </div>
                                </div>
                            </div>
                            )}


                        </div>
                        <div className="xl:w-1/2 md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
                            <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                                <div>
                                   
                                 
                                </div>
                                <div>
                                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                        <p className="text-2xl leading-normal text-gray-800">Total</p>
                                        <p className="text-2xl font-bold leading-normal text-right text-gray-800">${totalPrice}</p>
                                    </div>
                                    <button onClick={saveCartToDB} className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Cart