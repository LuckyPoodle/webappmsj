
import React, { Fragment, useState, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PencilIcon } from '@heroicons/react/outline';
import SearchBox from './searchBox';
import Image from 'next/image';
import Resizer from "react-image-file-resizer";
import toast, { Toaster } from 'react-hot-toast';
import { axiosAuth } from "../actions/axios";

import { Context } from '../context'
import { useContext } from 'react';


const ShopDetailsDashboard
  = ({ shopData }) => {

    const { state: { dashboardShowProductsDetails }, dispatch } = useContext(Context);

    const toggleViewProductsDetails = () => {
      dispatch({ type: 'DASHBOARD_SHOW_PRODUCTS', payload: true })
    }
    //for poopup modal to edit shop fields 
    const [openModal, setOpen] = useState(false);

    //switch to products component
    const [showProducts, setShowProducts] = useState(false);


    //editing fields
    const [fieldToEdit, setFieldToEdit] = useState("");

    const [addressValues, setAddressValues] = useState({

      address: '',
      latitude: 0,
      longitude: 0,



    });
    const [address, setAddress] = useState("");
    const [longitude, setLongitude] = useState("")
    const [latitide, setLatitude] = useState("");
    const [description, setDescription] = useState("")
    const [shopContactEmail, setShopContactEmail] = useState("")
    const [shopContactNumber, setShopContactNumber] = useState("")
    const [bankAccountNumber, setBankAccountNumber] = useState("")
    const [bankName, setBankName] = useState("")
    const [deliveryPickUpOption, setDeliveryPickUpOption] = useState("");
    const [deliveryPickUpInfo, setDeliveryPickUpInfo] = useState("");
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [shopTitle, setShopTitle] = useState("")
    //image-related editing
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState("");
    const [showImageDeleteButton, setShowImageDeleteButton] = useState(false);



    const cancelButtonRef = useRef(null)

    const notify = (message, success) => toast(message, {
      style: {
        border: success ? '1px solid green' : '1px solid red',
      },
    });




    const handleEdit = (field) => {
      setOpen(true);
      console.log(field)
      setFieldToEdit(field)

    }

    const handleChange = (e) => {
      if (fieldToEdit == 'description') {
        setDescription(e.target.value)
      } else if (fieldToEdit == 'shopContactEmail') {
        setShopContactEmail(e.target.value)

      } else if (fieldToEdit == 'shopContactNumber') {
        setShopContactNumber(e.target.value)

      } else if (fieldToEdit == 'bankAccountNumber') {
        setBankAccountNumber(e.target.value)
      } else if (fieldToEdit == 'bankName') {
        setBankName(e.target.value)
      } else if (fieldToEdit == 'deliveryPickUpOption') {
        console.log("deliveryPickUpOption -  ", e.target.value);
        setDeliveryPickUpOption(e.target.value)
      } else if (fieldToEdit == 'deliveryPickUpInfo') {
        setDeliveryPickUpInfo(e.target.value)
      } else if (fieldToEdit == 'deliveryFee') {
        setDeliveryFee(e.target.value)
      } else if (fieldToEdit == 'shopTitle') {
        setShopTitle(e.target.value)
      }
    }

    async function uploadImageToPublito(file) {

      Resizer.imageFileResizer(file, 500, 500, "JPEG", 100, 0, async (uri) => {
        try {
          setLoading(true);
          let { data } = await axiosAuth.post("/upload-image", {
            image: uri,
          });
          console.log("IMAGE UPLOADED", data.url_preview);
          console.log(data)
          setImage(data.url_preview);
          setShowImageDeleteButton(true)
          setLoading(false);

        } catch (err) {
          console.log(err);

        }
      });
    }

    const handleImageUpload = async (e) => {
      let file = e.target.files[0];
      setPreview(window.URL.createObjectURL(file));
      try {
        await uploadImageToPublito(file);

        console.log("setShowImageDeleteButton --- > ", showImageDeleteButton)
      } catch (err) {
        notify('Something went wrong', false)
      }
    };

    const handleImageRemove = async () => {


      console.log('in handle image remove');
      console.log(image)
      try {
        let { data } = await axiosAuth.post("/delete-image", {
          imageUrl: image,
        });

        setShowImageDeleteButton(false);
        setPreview("")
        setImage("")


      } catch (e) {

      }

    }

    const handleEditSubmit = async (field) => {
      if (field == 'address') {


        try {
          console.log(address);

          const { data } = await axiosAuth.post(`/update-shop/${shopData[0]._id}`, { body: { values: addressValues }, });
          console.log(data);

          notify('Updated. Please refresh page', true)
          setOpen(false)



          //router.push("/instructor");
        } catch (err) {
          notify('Something went wrong', false)
          setOpen(false)

        }


      } else if (field == 'description') {
        try {
          const { data } = await axiosAuth.post(`/update-shop/${shopData[0]._id}`, { body: { values: { description: description } }, });
          console.log(data);
          notify('Updated. Please refresh page', true)
          setOpen(false)

        } catch (err) {
          notify('Something went wrong', false)
          setOpen(false)
        }

      } else if (field == 'image') {
        try {
          const { data } = await axiosAuth.post(`/update-shop/${shopData[0]._id}`, { body: { values: { shopImage: image } }, });
          console.log(data);
          setOpen(false)

          notify('Updated. Please refresh page', true)

        } catch (err) {
          notify('Something went wrong', false)
          setOpen(false)
        }
      } else if (field == 'shopContactNumber') {
        try {
          const { data } = await axiosAuth.post(`/update-shop/${shopData[0]._id}`, { body: { values: { shopContactNumber: shopContactNumber } }, });
          console.log(data);
          notify('Updated. Please refresh page', true)
          setOpen(false)

        } catch (err) {
          notify('Something went wrong', false)
          setOpen(false)
        }

      } else if (field == 'shopContactEmail') {
        try {
          const { data } = await axiosAuth.post(`/update-shop/${shopData[0]._id}`, { body: { values: { shopContactEmail: shopContactEmail } }, });
          console.log(data);
          notify('Updated. Please refresh page', true)
          setOpen(false)
        } catch (err) {
          notify('Something went wrong', false)
          setOpen(false)
        }

      } else if (field == 'bankAccountNumber') {
        try {
          const { data } = await axiosAuth.post(`/update-shop/${shopData[0]._id}`, { body: { values: { bankAccountNumber: bankAccountNumber } }, });
          console.log(data);
          notify('Updated. Please refresh page', true)
          setOpen(false)
        } catch (err) {
          notify('Something went wrong', false)
          setOpen(false)
        }
      } else if (field == 'bankName') {
        try {
          const { data } = await axiosAuth.post(`/update-shop/${shopData[0]._id}`, { body: { values: { bankName: bankName } }, });
          console.log(data);
          notify('Updated. Please refresh page', true)
          setOpen(false)
        } catch (err) {
          notify('Something went wrong', false)
          setOpen(false)
        }
      } else if (field == 'deliveryPickUpOption') {
        try {
          const { data } = await axiosAuth.post(`/update-shop/${shopData[0]._id}`, { body: { values: { deliveryPickUpOption: deliveryPickUpOption } }, });
          console.log(data);
          notify('Updated. Please refresh page', true)
          setOpen(false)
        } catch (err) {
          notify('Something went wrong', false)
          setOpen(false)
        }

      } else if (field == 'deliveryPickUpInfo') {
        try {
          const { data } = await axiosAuth.post(`/update-shop/${shopData[0]._id}`, { body: { values: { deliveryPickUpInfo: deliveryPickUpInfo } }, });
          console.log(data);
          notify('Updated. Please refresh page', true)
          setOpen(false)
        } catch (err) {
          notify('Something went wrong', false)
          setOpen(false)
        }

      } else if (field == 'deliveryFee') {
        try {
          const { data } = await axiosAuth.post(`/update-shop/${shopData[0]._id}`, { body: { values: { deliveryFee: deliveryFee } } });
          console.log(data)
          notify('Updated. Please refresh page', true)
          setOpen(false)

        } catch (err) {
          notify('Something went wrong', false)
          setOpen(false)

        }
      } else if (field == 'shopTitle') {
        try {
          const { data } = await axiosAuth.post(`/update-shop/${shopData[0]._id}`, { body: { values: { shopTitle: shopTitle } } });
          console.log(data)
          notify('Updated. Please refresh page', true)
          setOpen(false)

        } catch (err) {
          notify('Something went wrong', false)
          setOpen(false)

        }

      }


    }

    return (
      <div className='h-screen overflow-y-auto'>
        <div className=" px-4 py-5 sm:px-6">



          <h3 className="text-lg leading-6 font-medium text-gray-900">Your Shop Details</h3>

          <button onClick={toggleViewProductsDetails} type="button" class="text-white p-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">View/Edit Products</button>


        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Shop name</dt>
              {/* <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{shopData[0].shopTitle}</dd> */}
              <div className='row'><dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{shopData[0].shopTitle}</dd><button onClick={() => handleEdit('shopTitle')}>edit</button> </div>

            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Shop Address</dt>
              <div className='row'><dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{shopData[0].address}</dd><button onClick={() => handleEdit('address')}>edit</button> </div>
            </div>
            <div className="bg-gray-50  px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Shop Delivery/Pick up option</dt>
              <div className='row'><dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{shopData[0].deliveryPickUpOption}</dd><button onClick={() => handleEdit('deliveryPickUpOption')}>edit</button> </div>
            </div>

            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Delivery Fee</dt>
              <div className='row'><dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{shopData[0].deliveryFee}</dd><button onClick={() => handleEdit('deliveryFee')}>edit</button> </div>
            </div>

            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Shop Delivery/Pick up Info</dt>
              <div className='row'><dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{shopData[0].deliveryPickUpInfo}</dd><button onClick={() => handleEdit('deliveryPickUpInfo')}>edit</button> </div>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Shop Url</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{shopData[0].slug}</dd>
            </div>

            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <div className='row'><dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{shopData[0].description}</dd><button onClick={() => handleEdit('description')}>edit</button> </div>


            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Bank Account Number</dt>
              <div className='row'><dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{shopData[0].bankAccountNumber}</dd><button onClick={() => handleEdit('bankAccountNumber')}>edit</button> </div>


            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Bank Name</dt>
              <div className='row'><dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{shopData[0].bankName}</dd><button onClick={() => handleEdit('bankName')}>edit</button> </div>


            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Shop Contact Email</dt>
              <div className='row'><dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{shopData[0].shopContactEmail}</dd><button onClick={() => handleEdit('shopContactEmail')}>edit</button> </div>


            </div>

            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Shop Contact Number</dt>
              <div className='row'><dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{shopData[0].shopContactNumber}</dd><button onClick={() => handleEdit('shopContactNumber')}>edit</button> </div>


            </div>

            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Shop Profile Image</dt>
              <div className='row'><dd className="mt-1  sm:mt-0 sm:col-span-2"><Image src={shopData[0].shopImage} width={100} height={100}></Image></dd><button onClick={() => handleEdit('image')}>edit</button> </div>


            </div>

          </dl>
        </div>

        {
          openModal ? <Transition.Root show={openModal} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={() => { }}>
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                  <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-y-visible shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <PencilIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            Edit
                          </Dialog.Title>
                          <div className="mt-2">


                            {
                              fieldToEdit == 'address' ?

                                <div >
                                  <SearchBox onSelectAddress={(address, latitude, longitude) => {


                                    setAddressValues({ "latitude": latitude, "address": address, "longitude": longitude });

                                  }} defaultValue="" />

                                </div>



                                : fieldToEdit == 'description' ?
                                  <div>
                                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                      Description
                                    </label>
                                    <div className="mt-1">
                                      <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        onChange={handleChange}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                        placeholder="E.g I am passionate about baking healthy yet mouth-watering donuts. "
                                        defaultValue={''}
                                      />
                                    </div></div> : fieldToEdit == 'shopContactEmail' ?
                                    <div>
                                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                        Shop Contact Email
                                      </label>
                                      <div className="mt-1">
                                        <textarea
                                          id="shopContactEmail"
                                          name="shopContactEmail"

                                          onChange={handleChange}
                                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                          placeholder="E.g example@example.com "
                                          defaultValue={''}
                                        />
                                      </div></div> : fieldToEdit == 'shopContactNumber' ?
                                      <div>
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                          Shop Contact Number
                                        </label>
                                        <div className="mt-1">
                                          <textarea
                                            id="shopContactNumber"
                                            name="shopContactNumber"

                                            onChange={handleChange}
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                            placeholder="E.g 88888888"
                                            defaultValue={''}
                                          />
                                        </div></div> : fieldToEdit == 'image' ?

                                        <div>
                                          <label className="block text-sm font-medium text-gray-700">Shop Profile Image</label>
                                          <div className="mt-1 flex items-center">
                                            <span className="inline-block h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                                              {preview ? <div className="row">

                                                <div class="avatar">
                                                  <div class="w-full h-full rounded">
                                                    <img className="object-cover h-full w-full" src={preview} />

                                                  </div>

                                                </div>
                                              </div> : <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M3 10v11h6v-7h6v7h6v-11L12,3z" />
                                              </svg>}
                                            </span>
                                            <label

                                              className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageUpload} />
                                              Upload
                                            </label>
                                            {showImageDeleteButton ? <label

                                              className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >  <input className="sr-only" onClick={handleImageRemove} />
                                              Remove Image
                                            </label> : <span></span>}
                                          </div>
                                        </div> : fieldToEdit == 'bankAccountNumber' ?
                                          <div className="grid grid-cols-3 gap-6">
                                            <div className="col-span-3 sm:col-span-2">
                                              <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                                Bank Account Number
                                              </label>

                                              <div className="mt-1 flex rounded-md shadow-sm">

                                                <input
                                                  type="text"
                                                  name="bankAccountNumber"
                                                  onChange={handleChange}
                                                  id="bankAccountNumber"
                                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                  placeholder="E.g xxxx-xxxx-xxxx"
                                                />
                                              </div>
                                            </div>
                                          </div> : fieldToEdit == 'bankName' ?
                                            <div className="grid grid-cols-3 gap-6">
                                              <div className="col-span-3 sm:col-span-2">
                                                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                                  Bank Name
                                                </label>

                                                <div className="mt-1 flex rounded-md shadow-sm">

                                                  <input
                                                    type="text"
                                                    name="bankName"
                                                    onChange={handleChange}
                                                    id="bankName"
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                    placeholder="E.g ABC Bank"
                                                  />
                                                </div>
                                              </div>
                                            </div> : fieldToEdit == 'deliveryPickUpInfo' ?
                                              <>
                                                <div>
                                                  <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                                    Delivery / Pick Up Info
                                                  </label>
                                                  <div className="mt-1">
                                                    <textarea
                                                      id="deliveryPickUpInfo"
                                                      name="deliveryPickUpInfo"
                                                      rows={3}
                                                      onChange={handleChange}
                                                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                      placeholder=""
                                                      defaultValue={''}
                                                    />
                                                  </div></div>
                                              </> : fieldToEdit == 'deliveryPickUpOption' ? <>
                                                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                                  Delivery / Pick Up Option
                                                </label>
                                                <select
                                                  style={{ width: "100%" }}
                                                  size="large"
                                                  required

                                                  name="deliveryPickUpOption"
                                                  defaultValue={'Delivery and Pickup Available'}
                                                  onChange={handleChange}
                                                  className='text-gray-900 '
                                                >

                                                  <option value={'Delivery and Pickup Available'}  >Both Delivery And Pickup Available</option>
                                                  <option value={"Delivery Only"}  >Delivery Only</option>
                                                  <option value={"Pickup Only"}  >Pickup Only</option>

                                                </select></> : fieldToEdit == 'deliveryFee' ? <>
                                                  <input
                                                    type="number"
                                                    name="deliveryFee"
                                                    min={0}
                                                    className="w-full text-gray-900  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                    placeholder="Delivery Price"
                                                    value={deliveryFee}
                                                    onChange={handleChange}
                                                  />
                                                </> : fieldToEdit == 'shopTitle' ? <>
                                                  <input
                                                    type="text"
                                                    name="shopName"
                                                    onChange={handleChange}
                                                    id="shopName"
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-md border border-gray-300 rounded-md"
                                                
                                                  />
                                                </> :




                                                <></>
                            }




                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      {loading ? <span>loading</span> : <button
                        type="button"

                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => handleEditSubmit(fieldToEdit)}
                      >
                        Submit Change
                      </button>}
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root> : <></>
        }
      </div>
    )
  }

export default ShopDetailsDashboard
