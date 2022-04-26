import React, { useEffect } from 'react';
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Context } from '../context'
import { useContext } from 'react';
import { axiosAuth } from "../actions/axios";
import EditProductForm from '../components/forms/EditProduct'
import { PencilIcon } from '@heroicons/react/outline';
import toast, { Toaster } from 'react-hot-toast';
import Resizer from "react-image-file-resizer";


const ProductsDetailsDashboard = ({ shopData }) => {
  const notify = (message, success) => toast(message, {
    style: {
      border: success ? '1px solid green' : '1px solid red',
    },
  });

  const { state: { dashboardShowProductsDetails }, dispatch } = useContext(Context);
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState([]);
  const [loading,setLoading]=useState(false)
  const [uploadMainImageLoading,setUploadMainImageLoading]=useState(false)
  const cancelButtonRef = useRef(null);

  //images
  const handleImageRemove = (imageurl) => {
    axiosAuth.post("/delete-image", {
      imageUrl: imageurl,
    }).then((_) => {
      //filter out deleted item from images
      let filteredimages = images.filter((item) => {
        return item !== imageurl
      });
      setImages(filteredimages);

    }).catch((e) => {

    })
  }

  async function uploadImageToPublito(file) {

    Resizer.imageFileResizer(file, 500, 500, "JPEG", 100, 0, async (uri) => {
      try {
        setUploadMainImageLoading(true)
        let { data } = await axiosAuth.post("/upload-image", {
          image: uri,
        });
        console.log("IMAGE UPLOADED", data.url_preview);
        console.log(data)
        setProductValues({ ...productValues, mainImage: data.url_preview })
        
        setUploadMainImageLoading(false)

      } catch (err) {
        console.log(err);

      }
    });
  }

  const handleMainImageRemove = (imageurl) => {
    axiosAuth.post("/delete-image", {
      imageUrl: imageurl,
    }).then((_) => {
      //filter out deleted item from images
      setProductValues({ ...productValues, mainImage: '' })

    }).catch((e) => {

    })
  }
  const handleMainImage=async(e)=>{
    let file = e.target.files[0];
    
    try {
      await uploadImageToPublito(file);

    
    } catch (err) {
      notify(err, false)
    }
  }



  const handleImage = async (e) => {
    let files = e.target.files;
    // console.log('HANDLE IMAGES!!!!! FILES , ',files);

    console.log(files)

    setLoading(true)
    let tempList = images.slice()
    for (let i = 0; i < files.length; i++) {
      console.log(files[i])

      setLoading(true)

      Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (uri) => {
        axiosAuth.post("/upload-image", {
          image: uri,
        }).then(res => {

          console.log(res.data.url_preview);
          tempList.push(res.data.url_preview);
          setImages([])
          setImages(tempList);
          setLoading(false)
        });

      })
    }

    console.log('========== IMAGES ===========');
    console.log(images);
  }

  useEffect(()=>{
    //fetch products of shop
    fetchShopProducts();

  },[]);

  const fetchShopProducts = async () => {
    try{
     setLoading(true);
     const { data } = await axiosAuth.get(`/get-shop-products/${shopData[0]._id}`, {});
     console.log(data);
     console.log("~~~~~~~~~~~~~~~~~~fetch products~~~~~~~~~~~~~~~~~~~~~~");
    
     setLoading(false)
     setProducts(data)
     
    }catch(err){
      console.log('something went wrong fetching products')
      setLoading(false)

    }
 
   }


  const [products,setProducts]=useState([])

  ///empty if creating new product. filled if updating product
  const [productValues, setProductValues] = useState({

    name: '',
    shop: '',
    price: 0,
    category: '',
    deliveryPrice: 0,
    deliveryAvailable: false,
    owner: '',
    images: [],
    mainImage:'',
    mainImageAlt:''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("HANDLE SUBMIT")
      productValues.shop = shopData[0]._id;
      productValues.owner = shopData[0].owner._id;
      productValues.images = images;
      const { data } = await axiosAuth.post(`/create-product/${shopData[0]._id}`, { body: { values: productValues }, });
      console.log(data);

      notify('Created. Please refresh page', true)
      setOpen(false)
      //router.push("/instructor");
    } catch (err) {
      notify('Something went wrong', false)
      setOpen(false)
    }

  };



  const toggleViewProductsDetails = () => {
    dispatch({ type: 'DASHBOARD_SHOW_PRODUCTS', payload: false })
  }

  const toggleEditProduct = () => {

    console.log('toggle edit products!');
    console.log(productValues);
    setOpen(true);

  }

  const exitEditProduct = () => {
    setProductValues({

      name: '',
      shop: '',
      price: 0,
      category: '',
      deliveryPrice: 0,
      deliveryAvailable: false,


      images: [],
    });
    setOpen(false)
  }

  return (


    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <button onClick={toggleViewProductsDetails} type="button" class="text-white p-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">View/Edit Shop</button>
        <button onClick={toggleEditProduct} type="button" class="text-white p-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Add product</button>


        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Your Products</h2>

        {loading?<span>loading</span>:<div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.length == 0 ? <h3>Your shop is empty!</h3> : products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={product.images[0]}
                  // alt={product.imageAlt}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>}
      </div>
      <Transition.Root  show={open} as={Fragment}>
        <Dialog as="div" className="fixed pt-10 z-60 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={exitEditProduct}>
          <div className="flex  items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <PencilIcon className="h-6 w-6 text-white-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Add/Edit product
                      </Dialog.Title>

                    </div>
                  </div>
                  <EditProductForm  handleMainImageRemove={handleMainImageRemove} uploadMainImageLoading={uploadMainImageLoading} loading={loading} images={images} setImages={setImages} handleMainImage={handleMainImage}  handleImageRemove={handleImageRemove} handleImage={handleImage} productValues={productValues} setProductValues={setProductValues} />

                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={exitEditProduct}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>

  )
}

export default ProductsDetailsDashboard