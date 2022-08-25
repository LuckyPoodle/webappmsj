import React, { useEffect, useState, useContext } from "react";
import { Context } from '../context'
import { axiosAuth } from "../actions/axios";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";
import Header from "../components/Header"

const promise = loadStripe(process.env.NEXT_STRIPE_KEY);


const Checkout = ({ }) => {

    const router = useRouter();

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [saveAddressContact, setSaveAddressContact] = useState(false);
    const [contactNumber, setContactNumber] = useState("")
    const [deliveryCost, setDeliveryCost] = useState(0);
    const [payableByCard, setPayableByCard] = useState(0);
    const [payableByCash, setPayableByCash] = useState(0);

    const { state: { user }, dispatch } = useContext(Context);

    useEffect(() => {
        axiosAuth.get(`/user/cart`).then((res) => {
            setProducts(res.data.products);
            setDeliveryCost(res.data.deliveryCost);
            setPayableByCard(res.data.cartPayableByCreditCard);
            setPayableByCash(res.data.cartPayableByCash);
          
            if (res.data.orderedBy.deliveryAddress) {
                setAddress(res.data.orderedBy.deliveryAddress);
                dispatch({
                    type: "SET_DELIVERY_ADDRESS",
                    payload: res.data.orderedBy.deliveryAddress,
                });
            }
            if (res.data.orderedBy.deliveryContactNumber) {
                setContactNumber(res.data.orderedBy.deliveryContactNumber);
                dispatch({
                    type: "SET_CONTACT",
                    payload: res.data.orderedBy.deliveryContactNumber,
                });
            };
            dispatch({
                type: "SET_SAVE_DELIVERY_CONTACT",
                payload: false,
            });



            setTotal(res.data.cartTotal);
        })



    }, []);

    const createCashOrder = () => {
        console.log("CREATE CASH ORDER!!!!!");

        axiosAuth.post(`/user/create-cash-order`, { address, contactNumber, saveAddressContact }).then((res) => {
            if (res.data.ok) {
                dispatch({
                    type: 'CLEARCART',
                });
                router.push('/dashboard#orders')
            }


        })

    }





    const handleAddressChange = (e) => {
        setAddress(e.target.value);
        dispatch({
            type: "SET_DELIVERY_ADDRESS",
            payload: e.target.value,
        });

    }
    const handleContactChange = (e) => {
        setContactNumber(e.target.value);
        dispatch({
            type: "SET_CONTACT",
            payload: e.target.value,
        });

    }
    const handleCheckBox = (e) => {
        setSaveAddressContact(e.target.checked);
        dispatch({
            type: "SET_SAVE_DELIVERY_CONTACT",
            payload: e.target.value,
        });

    }

    return (

        <div className="min-h-screen">
            <Header />
            <div className="flex justify-center items-center h-full p-10 ">
                <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
                    <div className="flex flex-col justify-start items-start w-full space-y-9">
                        <div className="flex justify-start flex-col items-start space-y-2">
                            <button className="flex flex-row items-center text-gray-600 hover:text-gray-500 space-x-1">
                                <svg className="fill-stroke" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.91681 7H11.0835" stroke="currentColor" strokeWidth="0.666667" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.91681 7L5.25014 9.33333" stroke="currentColor" strokeWidth="0.666667" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.91681 7.00002L5.25014 4.66669" stroke="currentColor" strokeWidth="0.666667" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="text-sm leading-none" onClick={() => router.push('/cart')} >Back</p>
                            </button>
                            <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Checkout</p>
                            <p className="text-base leading-normal sm:leading-4 text-gray-600">
                                Cart {">"} Checkout
                            </p>
                        </div>

                        <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
                            <div className="xl:w-3/5 flex flex-col sm:flex-row xl:flex-col justify-center items-center bg-white py-3 sm:py-0 xl:py-10 px-10 xl:w-full">
                                <div className="flex flex-col justify-start items-start w-full space-y-4">
                                    {products.map((pdt) => <p className="text-xl md:text-2xl leading-normal text-gray-800">{pdt.name} - ${pdt.price} - {pdt.shipping == 'false' ? 'Pick Up' : 'Delivery'} </p>)}

                                    <p>Delivery Charges : ${deliveryCost}</p>
                                    <p>Amount Due: </p>
                                    <p className="text-base font-semibold leading-none text-2xl p-1 text-black">${total}</p>
                                    <div>
                                        <br />
                                        {payableByCard > 0 ? <>

                                            <div className='container'>
                                                <h5 className='font-bold text-black'>Delivery Address</h5>
                                                <textarea
                                                    id="address"
                                                    name="address"
                                                    rows={3}
                                                    value={address}
                                                    onChange={handleAddressChange}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-md border border-gray-300 rounded-md"

                                                    defaultValue={''}
                                                />
                                            </div>

                                        </> :
                                            <></>}
                                        <div className="container">
                                            <h5 className='font-bold text-black'>Contact Number *</h5>
                                            <span className="italic">Mandatory</span>
                                            <input
                                                type="text"
                                                name="contactNumber"
                                                value={contactNumber}
                                                onChange={handleContactChange}
                                                id="contactNumber"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-md border border-gray-300 rounded-md"

                                            />
                                        </div>

                                        <div className="flex flex-row">
                                            <div className="p-3">
                                                <input
                                                    type="checkbox"
                                                    name="saveAddressContact"
                                                    checked={saveAddressContact}
                                                    value={saveAddressContact}
                                                    onChange={handleCheckBox}
                                                /></div> <p className="pt-3">Save Info for future checkout</p>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <div className="p-8 bg-white flex flex-col lg:w-full xl:w-3/5">
                                {payableByCard > 0 ? <button className="border border-transparent  bg-gray-900 text-white flex flex-row justify-center items-center space-x-2 py-4 rounded w-full">

                                    <div>
                                        <p className="text-base leading-4">Cash Payment Not Available For Delivery Order</p>

                                    </div>
                                </button> : <button disabled={contactNumber.length == 0} onClick={createCashOrder} className="border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex flex-row justify-center items-center space-x-2 py-4 rounded w-full">

                                    <div>
                                        <p className="text-base leading-4">Pay Cash On Pick Up </p>

                                    </div>
                                </button>}

                                <div className="flex flex-row justify-center items-center mt-6">
                                    <hr className="border w-full" />
                                    <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600">pay with card</p>
                                    <hr className="border w-full" />
                                </div>





                                <button disabled={contactNumber.length == 0} onClick={() => router.push('/payment')} className="mt-8 border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
                                    <div>
                                        <p className="text-base leading-4">Pay With Card ${total}</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )



}

export default Checkout