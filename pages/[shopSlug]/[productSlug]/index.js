import { useEffect, useState, useContext } from 'react'
import { Context } from '../../../context'
import Link from 'next/link'

import renderHTML from "react-render-html";
import Header from '../../../components/Header'
import Image from 'next/image'
import axios from "axios";

import { useRouter } from "next/router";
const ProductDetails = ({ product }) => {

    if (!product) {
        return <div> NIL </div>
    }
    const [menu, setMenu] = useState(true);
    const [menu1, setMenu1] = useState(false);

    const { state: { cartItems, accumulatedCartQty }, dispatch } = useContext(Context);
    const router = useRouter();
    const handlePressAddToCart = (pdt) => {

        pdt.inclusivePrice = inclusivePrice
        pdt.shipping = shipping;
        pdt.shopId = product.shop._id;
        pdt.shopName = product.shop.shopTitle
        pdt.shopShippingFee = product.shop.deliveryFee

        dispatch({
            type: "ADDTOCART",
            payload: pdt,
        });
    }



    const [currentImage, setCurrentImage] = useState(product.mainImage);
    const [imagesToShow, setImagesToShow] = useState([]);
    const [shipping, setShipping] = useState("false");
    const [inclusivePrice, setInclusivePrice] = useState(0);

    useEffect(() => {
        //to reset shipping state
 
        setShipping("false")

    }, [router.query])



    const handleSelectShipping = (e) => {
        setShipping(e.target.value);
        if (e.target.value == "true") {
            //UPDATE : currently not implementing individual product delivery fee
            //let newprice = product.deliveryPrice + product.price;
            let newprice = product.price;

            setInclusivePrice(newprice)
        } else {
            setInclusivePrice(product.price)
        }
    }

    useEffect(() => {

        setCurrentImage(product.mainImage);
        setInclusivePrice(product.price)
        var imagesList = [product.mainImage];

        product.images.forEach((i) => {
            imagesList.push(i)
        });
        console.log('----------image list----------')
        console.log(imagesList);
        console.log('--------------------------')
        setImagesToShow(imagesList)


    }, []);





    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    return (
        <div>

            <Header />

            <div className="h-full md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">


                {/* <div className="xl:w-2/6 h-1/2 overflow-scroll lg:w-2/5 w-80 md:block hidden">
    {imagesToShow.map((image)=>(
        <img className="w-full pt-3" alt="img of a girl posing" src={image} />
    ))}

</div> */}

                <div className='flex-col md:block hidden'>
                    <Image className="w-full" width={600} height={600} alt={product.mainImageAlt} src={currentImage} />
                    <div className="flex space-x-3 overflow-scroll  p-3 -ml-3">
                        {imagesToShow?.map((image) => (
                            <img alt={product.mainImageAlt} onClick={() => setCurrentImage(image)} className="md:w-48 md:h-48 w-15 h-15" src={image} />
                        ))}
                    </div>

                </div>
                <div className="md:hidden">
                    <Image className="w-full" width={600} height={600} alt={product.mainImageAlt} src={currentImage} />
                    <div className="flex space-x-3 overflow-scroll  p-3 -ml-3">
                        {imagesToShow?.map((image) => (
                            <img alt={product.mainImageAlt} onClick={() => setCurrentImage(image)} className="md:w-48 md:h-48 w-20 h-20" src={image} />
                        ))}
                    </div>

                </div>
                <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                    <div className=" border-b border-gray-200 pb-6">
                        <Link href={`/${product.shop.slug}`}><a className="text-sm leading-none text-gray-600">{product.shop.shopTitle}</a></Link>

                        <h1
                            className="
                lg:text-2xl
                text-xl
                font-semibold
                lg:leading-6
                leading-7
                text-gray-800
                mt-2
            "
                        >
                            {product.name}
                        </h1>
                        {/* <div className='p-4 italic'> *****   <Link href={`/${product.shop.slug}/${product.slug}/reviews?product=${product._id}`}><a className="text-sm leading-none text-gray-600">Read/Write Reviews</a></Link></div> */}
                        {/* <span className='text-md'>qty remaining : {product.stockAvailable}</span> */}
                        <br />


                        <span className='text-black text-lg  '>$ {inclusivePrice}</span>
                    </div>
                    {product.deliveryAvailable ?
                        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                            <p className="text-base leading-4 text-gray-800">Local Delivery?</p>
                            <div className="flex items-center justify-center">


                                <select className='text-black' value={shipping} onChange={handleSelectShipping}>
                                    <option value="true">Yes</option>
                                    <option value="false">No (Pickup) </option>

                                </select>
                            </div>
                        </div> : <p>Pick Up Only</p>}



                    {product.outOfStock!=true ?
                        <button
                            onClick={() => handlePressAddToCart(product)}
                            className="
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
            text-base
            flex
            items-center
            justify-center
            leading-none
            text-white
            bg-gray-800
            w-full
            py-4
            hover:bg-gray-700
        "
                        >

                            Add To Cart
                        </button> :
                        <button

                            disabled={true}
                            className="
           
            text-base
            flex
            items-center
            justify-center
            leading-none
            text-white
            bg-gray-800
            w-full
            py-4
           
        "
                        >

                            Unavailable
                        </button>}
                    <div>
                        <p className="xl:pr-8 text-base lg:leading-tight leading-normal text-gray-600 mt-7">{renderHTML(product.description)}</p>

                    </div>
                    {/* <div>
                        <div className="border-t border-b py-4 mt-7 border-gray-200">
                            <div onClick={() => setShow(!show)} className="flex justify-between items-center cursor-pointer">
                                <p className="text-base leading-4 text-gray-800">Shipping and returns</p>
                                <button
                                    className="
                        cursor-pointer
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
                        rounded
                    "
                                    aria-label="show or hide"
                                >
                                    <svg className={"transform " + (show ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className={"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " + (show ? "block" : "hidden")} id="sect">
                                You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are nonrefundable
                            </div>
                        </div>
                    </div> */}
                    {/* <div>
                        <div className="border-b py-4 border-gray-200">
                            <div onClick={() => setShow2(!show2)} className="flex justify-between items-center cursor-pointer">
                                <p className="text-base leading-4 text-gray-800">Contact us</p>
                                <button
                                    className="
                        cursor-pointer
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
                        rounded
                    "
                                    aria-label="show or hide"
                                >
                                    <svg className={"transform " + (show2 ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className={"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " + (show2 ? "block" : "hidden")} id="sect">
                                If you have any questions on how to return your item to us, contact us.
                            </div>
                        </div>






                    </div> */}

                </div>





            </div>
        </div>


    )
}




// export async function getServerSideProps({ query }) {
//     console.log('_____ query slug ______')
//     console.log(query.productSlug)
//     const { data } = await axios.get(
//         `${process.env.api}/read-product/${query.shopSlug}/${query.productSlug}`
//     );
//     console.log('gotten back DATA ===========>>>>>>>>>>');
//     console.log(data)
//     return {
//         props: {
//             product: data,
//         },
//     };
// }


export async function getStaticProps(context) {
   try{
    const { params } = context;
    const { shopSlug, productSlug } = params;
    console.log('IN GET STATIC PROPS');
    const { data } = await axios.get(
        `${process.env.api}/read-product/${shopSlug}/${productSlug}`
    );
    if (!data) {
        return {
          notFound: true,
        }
      }
    return {
        props: {
            product: data

        },
        revalidate: 600
    }
   }catch(e){
    return {
        notFound: true,
      }
   }
}

export async function getStaticPaths() {
    const { data } = await axios.get(
        `${process.env.api}/get-all-products`
    );
   
    console.log('gotten back all products ===========>>>>>>>>>>');
    console.log(data)
    const paths = data.map(pdt => ({ params: { productSlug: pdt.slug, shopSlug: pdt.shopSlug } }));
    /// TO CHANGE THIS TO PREFETCH FEATURED PRODUCTS ONLY
    /// AND THEN SET FALLBACK TO TRUE SO if app encounters non-generated slug it will dynamically fetch
    return {
        paths: paths,
        fallback: true
    }
}

export default ProductDetails;

