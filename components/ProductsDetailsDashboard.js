import React, { useEffect } from 'react';
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Context } from '../context'
import { useContext } from 'react';
import { axiosAuth } from "../actions/axios";
import EditProductForm from '../components/forms/EditProduct'
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import toast, { Toaster } from 'react-hot-toast';
import Resizer from "react-image-file-resizer";
import ConfirmationDialog from './confirmationDialog';



const ProductsDetailsDashboard = ({ shopData }) => {
  const notify = (message, success) => toast(message, {
    style: {
      border: success ? '1px solid green' : '1px solid red',
    },
  });

  const { state: { dashboardShowProductsDetails }, dispatch } = useContext(Context);
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false)
  const [uploadMainImageLoading, setUploadMainImageLoading] = useState(false);
  const [isEditing,setIsEditing]=useState(false);
  const [showConfirmation,setShowConfirmation]=useState(false);

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
  const handleMainImage = async (e) => {
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

  useEffect(() => {
    //fetch products of shop
    fetchShopProducts();

  }, []);

  const fetchShopProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axiosAuth.get(`/get-shop-products/${shopData[0].slug}`, {});
      console.log(data);
      console.log("~~~~~~~~~~~~~~~~~~fetch products~~~~~~~~~~~~~~~~~~~~~~");

      setLoading(false)
      setProducts(data)

    } catch (err) {
      console.log('something went wrong fetching products')
      setLoading(false)

    }

  }


  const [products, setProducts] = useState([])

  ///empty if creating new product. filled if updating product
  const [productValues, setProductValues] = useState({
    id:'',
    name: '',
    shop: '',
    price: 0,
    category: 'Food',
    slug:'',
    deliveryPrice: 0,
    deliveryAvailable: false,
    owner: '',
    images: [],
    mainImage: '',
    mainImageAlt: ''
  });



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (productValues.category.trim() == '' || productValues.name.trim() == '' || productValues.description.trim() == '') {
      notify('Please fill in all required fields', false);
      return;
    }
    if (!isEditing){
      try {
        console.log("HANDLE SUBMIT")
        productValues.shop = shopData[0]._id;
        productValues.owner = shopData[0].owner._id;
        productValues.images = images;
        productValues.shopName=shopData[0].shopTitle;
        productValues.address=shopData[0].address;
        productValues.latitude=shopData[0].latitude;
        productValues.longitude=shopData[0].longitude;
        const { data } = await axiosAuth.post(`/create-product/${shopData[0]._id}`, { body: { values: productValues }, });
        console.log('this is data from handlesubmit!')
        console.log(data);
        //clear state
        exitEditProduct();
        notify('Created. Please refresh page', true)
  
        //router.push("/instructor");
      } catch (err) {
        console.log('this is err from handlesubmit')
        console.log(err.response.data.err)
  
        notify(err.response.data.err, false)
        setOpen(false)
      }
    }else{

     
      try{
        console.log('HANDLE SUBMIT UPDATE');
   
      productValues.shop = shopData[0]._id;
      productValues.owner = shopData[0].owner._id;
      productValues.images = images;
      productValues.shopName=shopData[0].shopTitle;
      productValues.address=shopData[0].address;
      productValues.latitude=shopData[0].latitude;
      productValues.longitude=shopData[0].longitude;
      const {data}=await axiosAuth.post(`/update-product/${productValues.id}`,{body:{values:productValues}});
      console.log('this is data from handlesubmit update');
      console.log(data)
      exitEditProduct();
      notify('Update Product. Please refresh page',true);
      }catch (err) {
        console.log('this is err from handlesubmit')
        console.log(err.response.data.err)
  
        notify(err.response.data.err, false)
        setOpen(false)
      }


    }

  };

  const handleDeleteProduct=async()=>{
    console.log("DELETE PRODUCT!!!");
    //router.post("/delete-product/:productSlug",findOrCreateUser,removeProductFromShop);
    try{
      const {result}=await axiosAuth.post(`/delete-product/${productValues.id}`);
      notify('Deleted Product. Please refresh page',true);

    }catch(err){
      notify(err.response.data.err, false)
    }
    handleConfirmationDialog();

  }

  const handleConfirmationDialog=(id)=>{
 
    setProductValues({id:id})

    setShowConfirmation(!showConfirmation);
  }



  const toggleViewProductsDetails = () => {
    dispatch({ type: 'DASHBOARD_SHOW_PRODUCTS', payload: false })
  }

  const toggleEditProduct = (product) => {

    console.log('toggle edit products!');
    setIsEditing(true)
    setProductValues({
      id:product._id,
      slug:product.slug,
      name: product.name,
      shop: product.shop,
      price: product.price,
      category: product.category,
      description:product.description,
      deliveryPrice: product.deliveryPrice,
      deliveryAvailable: product.deliveryAvailable,
      owner: product.owner,
      images: product.images,
      mainImage: product.mainImage,
      mainImageAlt: product.mainImageAlt
    });
    setImages(product.images)


    setOpen(true);

  }

  const toggleAddProduct = () => {

    console.log('toggle add products!');
    setIsEditing(false)
   


    setOpen(true);

  }
  const exitEditProduct = () => {
    setProductValues({

      name: '',
      shop: '',
      price: 0,
      category: 'Food',
      deliveryPrice: 0,
      deliveryAvailable: false,
      mainImage: '',
      mainImageAlt: '',

      images: [],
    });
    setImages([])
    setOpen(false)
    setIsEditing(false);
  }

  return (


    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <button onClick={toggleViewProductsDetails} type="button" className="text-white p-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">View/Edit Shop</button>
        <button onClick={toggleAddProduct} type="button" className="text-white p-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Add product</button>


        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Your Products</h2>

        {loading ? <span>loading</span> : <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.length == 0 ? <h3>Your shop is empty!</h3> : products.map((product) => (
            <div className='col'>

              <div key={product.id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={product.mainImage}
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
                    <p className="mt-1 text-sm text-gray-500"></p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </div>

              <div className='flex justify-between'>
              <button className='text-black'  onClick={()=>toggleEditProduct(product)}>Edit</button>
              <button className='' onClick={()=>handleConfirmationDialog(product._id)}>  <TrashIcon className="h-6 w-6 text-black-600" aria-hidden="true" /></button>
              </div>




            </div>
          ))}
        </div>}
      </div>
      <ConfirmationDialog showConfirmation={showConfirmation} handleCancel={handleConfirmationDialog} handleYes={handleDeleteProduct}  message={'Are you sure you want to delete this product?'}  />
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed pt-10  z-60 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={exitEditProduct}>
          <div className="flex  items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
              <div className="relative min-w-full inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <PencilIcon className="h-6 w-6 text-white-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg pb-10 leading-6 font-medium text-gray-900">
                        Add/Edit product
                      </Dialog.Title>

                    </div>
                  </div>
                  <EditProductForm isEditing={isEditing}  cancelButtonRef={cancelButtonRef} exitEditProduct={exitEditProduct} handleSubmit={handleSubmit} handleMainImageRemove={handleMainImageRemove} uploadMainImageLoading={uploadMainImageLoading} loading={loading} images={images} setImages={setImages} handleMainImage={handleMainImage} handleImageRemove={handleImageRemove} handleImage={handleImage} productValues={productValues} setProductValues={setProductValues} />

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