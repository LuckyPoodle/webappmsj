import React, { useState } from "react";
import Header from "../components/Header";


const FAQ = () => {
    const [show, setShow] = useState(false);
    return (
        <div className="h-screen  ">
            <Header />


            <div className=" h-1/2  mb-10 ">
                <section className="pt-10" id="faq">
                    <div className="container mx-auto">
                        <h2 className="mb-6 text-3xl font-semibold text-center md:text-4xl">
                            Frequently Asked Questions
                        </h2>
                        <p className="max-w-lg px-6 mx-auto text-center text-graishBlue">
                            If you have any other questions not found below, feel free to contact us.
                        </p>
                    </div>
                </section>

                <div className="container pb-20 bg-white">
                    <section id="faq-accordion">

                        <div className="container mx-auto px-6 mb-32">

                            <div className="max-w-2xl m-8 mx-auto overflow-hidden">

                                <div className="py-1 border-b outline-none group" tabindex="1">

                                    <div
                                        className="flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease"
                                    >

                                        <div
                                            className="transition duration-500 ease group-hover:text-red-500"
                                        >
                                            How do I sell here?
                                        </div>

                                        <div
                                            className="transition duration-500 ease group-focus:-rotate-180 group-focus:text-red-500"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12">
                                                <path
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="3"
                                                    d="M1 1l8 8 8-8"
                                                />
                                            </svg>
                                        </div>
                                    </div>


                                    <div
                                        className="overflow-hidden transition duration-500 group-focus:max-h-screen max-h-0 ease"
                                    >
                                        <p className="py-2 text-justify text-gray-400">
                                            Simply sign in with your Google account. You will be able to set up your shop in the user dashboard, and then add your products/services.
                                        </p>
                                    </div>
                                </div>


                                <div className="py-1 border-b outline-none group" tabindex="2">

                                    <div
                                        className="flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease"
                                    >

                                        <div
                                            className="transition duration-500 ease group-hover:text-red-500"
                                        >
                                            Is this free?
                                        </div>

                                        <div
                                            className="transition duration-500 ease group-focus:-rotate-180 group-focus:text-red-500"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12">
                                                <path
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="3"
                                                    d="M1 1l8 8 8-8"
                                                />
                                            </svg>
                                        </div>
                                    </div>


                                    <div
                                        className="overflow-hidden transition duration-500 group-focus:max-h-screen max-h-0 ease"
                                    >
                                        <p className="py-2 text-justify text-gray-400">
                                            Yes it is free to use. MakeShipJoy only extract 6% fee from Card payment to cope with transaction fees. Payment from cards will be distributed to your bank account by 30 Working Days after payment is finalised.
                                        </p>
                                    </div>
                                </div>


                                <div className="py-1 border-b outline-none group" tabindex="3">
                                    <div
                                        className="flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease"
                                    >

                                        <div
                                            className="transition duration-500 ease group-hover:text-red-500"
                                        >
                                            Who do I complain to for product/services quality issues
                                        </div>

                                        <div
                                            className="transition duration-500 ease group-focus:-rotate-180 group-focus:text-red-500"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12">
                                                <path
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="3"
                                                    d="M1 1l8 8 8-8"
                                                />
                                            </svg>
                                        </div>
                                    </div>


                                    <div
                                        className="overflow-hidden transition duration-500 group-focus:max-h-screen max-h-0 ease"
                                    >
                                        <p className="py-2 text-justify text-gray-400">
                                            MakeShipJoy is not responsible for the quality of the product/service rendered. However, if a product/service is found to be deceitful or harmful, it will be delisted.
                                            The aim of this platform is to make it easy for residents to support their nearby micro/budding home-businesses, so if a product/service is lacking in quality, your constructive feedback will be much appreciated by the seller(s)
                                        </p>
                                    </div>
                                </div>


                                <div className="py-1 border-b outline-none group" tabindex="4">

                                    <div
                                        className="flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease"
                                    >

                                        <div
                                            className="transition duration-500 ease group-hover:text-red-500"
                                        >
                                            How do I get a refund?
                                        </div>

                                        <div
                                            className="transition duration-500 ease group-focus:-rotate-180 group-focus:text-red-500"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12">
                                                <path
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="3"
                                                    d="M1 1l8 8 8-8"
                                                />
                                            </svg>
                                        </div>
                                    </div>


                                    <div
                                        className="overflow-hidden transition duration-500 group-focus:max-h-screen max-h-0 ease"
                                    >
                                        <p className="py-2 text-justify text-gray-400">
                                            For payment made via cash, refund has to be given out by the sellers themselves. For card payment, MakeShipJoy will provide the refund if requested by the seller you are seeking the refund from.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>




            </div>


        </div>


    );
}

export default FAQ;
