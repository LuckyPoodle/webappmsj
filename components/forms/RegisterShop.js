import { useState } from 'react'

import Resizer from 'react-image-file-resizer'

import { axiosAuth } from '../../actions/axios'

import SearchBox from '../searchBox'

import toast, { Toaster } from 'react-hot-toast'

const RegisterShopForm = ({}) => {
  const notify = (message, success) =>
    toast(message, {
      style: {
        border: success ? '1px solid green' : '1px solid red',
      },
    })

  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState('')
  const [showImageDeleteButton, setShowImageDeleteButton] = useState(false)

  const [values, setValues] = useState({
    shopName: '',
    address: '',
    latitude: 0,
    longitude: 0,
    description: '',
    siteLinkOne: '',
    siteLinkTwo: '',
    siteLinkThree: '',
    siteLinkFour: '',
    shopContactEmail: '',
    shopContactNumber: '',
    bankAccountNumber: '',
    bankName: '',
    deliveryPickUpOption: 'Delivery and Pickup Available',
    deliveryPickUpInfo: '',
    deliveryFee: 0,
  })

  const [image, setImage] = useState('')

  async function uploadImageToPublito(file) {
    Resizer.imageFileResizer(file, 500, 500, 'JPEG', 100, 0, async (uri) => {
      try {
        setLoading(true)
        let { data } = await axiosAuth.post('/upload-image', {
          image: uri,
        })

        setImage(data.url_preview)
        setShowImageDeleteButton(true)
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleImageUpload = async (e) => {
    let file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
    try {
      await uploadImageToPublito(file)
    } catch (err) {
      notify('Something went wrong', false)
    }
  }

  const handleImageRemove = async () => {
    try {
      let { data } = await axiosAuth.post('/delete-image', {
        imageUrl: image,
      })

      setShowImageDeleteButton(false)
      setPreview('')
      setImage('')
    } catch (e) {}
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(values)
    console.log(image)

    try {
      const { data } = await axiosAuth.post('/create-shop', {
        body: { values: values, image: image },
      })

      alert(JSON.stringify(data))

      if (data.created == false) {
        notify(data.message, false)
      } else {
        notify('Created. Please refresh page', true)
      }
    } catch (err) {
      console.log(err)
      notify('Something went wrong', false)
    }
  }

  return (
    <form className='' onSubmit={handleSubmit}>
      <div>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6 text-gray-900 p-5'>
                Enter your shop details
              </h3>
              <p className='mt-1 text-md text-gray-600'></p>
            </div>
          </div>
          <div className='mt-5 md:mt-0 md:col-span-2'>
            <div className='shadow sm:rounded-md sm:overflow-hidden'>
              <div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
                <div className='grid grid-cols-3 gap-6'>
                  <div className='col-span-3 sm:col-span-2'>
                    <label
                      htmlFor='shop-name'
                      className='block text-md font-bold text-black'
                    >
                      Shop Name
                    </label>
                    <span className='text-gray-600 text-xs'>
                      Choose your shop name carefully. Subsequent name change is
                      bad for SEO.{' '}
                    </span>
                    <p className='text-gray-500 italic text-xs'>
                      {' '}
                      No vulgar names or names that violate copyright
                    </p>
                    <div className='mt-1 flex rounded-md shadow-sm'>
                      <input
                        type='text'
                        name='shopName'
                        onChange={handleChange}
                        id='shopName'
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-md border border-gray-300 rounded-md'
                      />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-3 gap-6'>
                  <div className='col-span-3 sm:col-span-2'>
                    <label
                      htmlFor='shop-email'
                      className='block text-md font-bold text-black'
                    >
                      Shop Contact Email
                    </label>

                    <div className='mt-1 flex rounded-md shadow-sm'>
                      <input
                        type='text'
                        name='shopContactEmail'
                        onChange={handleChange}
                        id='shopContactEmail'
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-md border border-gray-300 rounded-md'
                      />
                    </div>
                  </div>
                </div>
                <div className='grid grid-cols-3 gap-6'>
                  <div className='col-span-3 sm:col-span-2'>
                    <label
                      htmlFor='shop-contact'
                      className='block text-md font-bold text-black'
                    >
                      Shop Contact Number
                    </label>

                    <div className='mt-1 flex rounded-md shadow-sm'>
                      <input
                        type='text'
                        name='shopContactNumber'
                        onChange={handleChange}
                        id='shopContactNumber'
                        className=' shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-md border border-gray-300 rounded-md'
                        placeholder='E.g 91234567'
                      />
                    </div>
                  </div>
                </div>
                <div className='grid grid-cols-3 gap-6'>
                  <div className='col-span-3 sm:col-span-2'>
                    <label
                      htmlFor='shop-bank-number'
                      className='block text-md font-bold text-black'
                    >
                      Bank Account Number
                    </label>

                    <div className='mt-1 flex rounded-md shadow-sm'>
                      <input
                        type='text'
                        name='bankAccountNumber'
                        onChange={handleChange}
                        id='bankAccountNumber'
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-md border border-gray-300 rounded-md'
                      />
                    </div>
                  </div>
                </div>
                <div className='grid grid-cols-3 gap-6'>
                  <div className='col-span-3 sm:col-span-2'>
                    <label
                      htmlFor='bank-name'
                      className='block text-md font-bold text-black'
                    >
                      Bank Name
                    </label>

                    <div className='mt-1 flex rounded-md shadow-sm'>
                      <input
                        type='text'
                        name='bankName'
                        onChange={handleChange}
                        id='bankName'
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-md border border-gray-300 rounded-md'
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='shop-descriptiom'
                    className='block text-md font-bold text-black'
                  >
                    Shop Description
                  </label>
                  <div className='mt-1'>
                    <textarea
                      id='description'
                      name='description'
                      rows={3}
                      onChange={handleChange}
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-md border border-gray-300 rounded-md'
                      defaultValue={''}
                    />
                  </div>

                  <div className='pt-3'>
                    <label
                      htmlFor='shop-location'
                      className='block text-md font-bold text-black'
                    >
                      Select your shop location
                    </label>
                    <div className='mt-1 border'>
                      <SearchBox
                        className='z-50'
                        onSelectAddress={(address, latitude, longitude) => {
                          setValues({
                            ...values,
                            latitude: latitude,
                            address: address,
                            longitude: longitude,
                          })
                        }}
                        searchBoxText='Search Location'
                        defaultValue=''
                      />
                    </div>
                  </div>
                  <p className='mt-2 text-md text-gray-500'></p>
                </div>

                <div>
                  <label
                    htmlFor='shop-delivery-pickup'
                    className='block text-md font-bold text-black'
                  >
                    Delivery and Pickup Option
                  </label>
                  <select
                    style={{ width: '100%' }}
                    size='large'
                    required
                    value={values.deliveryPickUpOption}
                    name='deliveryPickUpOption'
                    defaultValue={'Delivery and Pickup Available'}
                    onChange={handleChange}
                    className='text-gray-900 '
                  >
                    <option value={'Delivery and Pickup Available'}>
                      Both Delivery And Pickup Available
                    </option>
                    <option value={'Delivery Only'}>Delivery Only</option>
                    <option value={'Pickup Only'}>Pickup Only</option>
                  </select>
                </div>
                <label
                  htmlFor='shop-delivery-pickup'
                  className='block text-md font-bold text-black'
                >
                  Delivery Fee (If Delivery Option Available)
                </label>

                <div>
                  <input
                    type='number'
                    name='deliveryFee'
                    min={0}
                    className='w-1/4 text-gray-900  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md'
                    placeholder='Delivery Price'
                    value={values.deliveryFee}
                    onChange={handleChange}
                  />
                </div>

                <label
                  htmlFor='shop-delivery-pickup'
                  className='block text-md font-bold text-black'
                >
                  Additional Delivery and Pickup Info
                </label>
                <p className='text-gray-500 italic text-xs'>
                  {' '}
                  E.g Will use Singpost Registered Mail / Will meet at lobby for
                  pickup/ Call xxxx-xxxx to arange delivery
                </p>

                <div>
                  <textarea
                    id='deliveryPickupInfo'
                    name='deliveryPickUpInfo'
                    rows={3}
                    onChange={handleChange}
                    className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-md border border-gray-300 rounded-md'
                    defaultValue={''}
                  />
                </div>

                <div>
                  <label
                    htmlFor='shop-name'
                    className='block text-md font-bold text-black'
                  >
                    Shop External Links
                  </label>
                  <span className='text-gray-500 italic text-xs'>
                    E.g your personal blog or youtube channel{' '}
                  </span>
                  <div class='grid grid-cols-2 gap-2'>
                    <div>
                      <h5 className='block text-sm font-bold text-black'>
                        External URL Link 1 *
                      </h5>

                      <input
                        type='text'
                        name='siteLinkOne'
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-md border border-gray-300 rounded-md'
                        placeholder=''
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <h5 className='block text-sm font-bold text-black'>
                        External URL Link 2 *
                      </h5>

                      <input
                        type='text'
                        name='siteLinkTwo'
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-md border border-gray-300 rounded-md'
                        placeholder=''
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div class='grid grid-cols-2 gap-2'>
                    <div>
                      <h5 className='block text-sm font-bold text-black'>
                        External URL Link 3 *
                      </h5>

                      <input
                        type='text'
                        name='siteLinkThree'
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-md border border-gray-300 rounded-md'
                        placeholder=''
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <h5 className='block text-sm font-bold text-black'>
                        External URL Link 4 *
                      </h5>

                      <input
                        type='text'
                        name='siteLinkFour'
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-md border border-gray-300 rounded-md'
                        placeholder=''
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className='block text-md font-bold text-black'>
                    Shop Profile Image
                  </label>
                  <div className='mt-1 flex items-center'>
                    <span className='inline-block h-16 w-16 rounded-full overflow-hidden bg-gray-100'>
                      {preview ? (
                        <div className='row'>
                          <div class='avatar'>
                            <div class='w-full h-full rounded'>
                              <img
                                alt=''
                                className='object-cover h-full w-full'
                                src={preview}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <svg
                          className='h-full w-full text-gray-300'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M3 10v11h6v-7h6v7h6v-11L12,3z' />
                        </svg>
                      )}
                    </span>
                    <label className='ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-md leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                      {' '}
                      <input
                        id='file-upload'
                        name='file-upload'
                        type='file'
                        className='sr-only'
                        onChange={handleImageUpload}
                      />
                      Upload
                    </label>
                    {showImageDeleteButton ? (
                      <label className='ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-md leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                        {' '}
                        <input
                          className='sr-only'
                          onClick={handleImageRemove}
                        />
                        Remove Image
                      </label>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>

                {/* <div>
                    <label className="block text-md font-medium text-gray-700">Shop Profile Image</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-md text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only"   onChange={handleImage} />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                      </div>
                    </div>
                  </div> */}
              </div>
              <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                {loading ? (
                  <span>Uploading</span>
                ) : (
                  <button
                    type='submit'
                    className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default RegisterShopForm
