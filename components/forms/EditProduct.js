import React, { useState } from 'react'
import Resizer from "react-image-file-resizer";
import { axiosAuth } from "../../actions/axios";
import { Avatar, Badge } from "antd";

const EditProductForm = ({cancelButtonRef,  exitEditProduct, handleSubmit,productValues, setProductValues,uploadMainImageLoading, images, handleImageRemove,handleMainImageRemove,handleImage, loading, handleMainImage }) => {







  const handleChange = (e) => {
    setProductValues({ ...productValues, [e.target.name]: e.target.value });

  }

  const handleCheckBox = (e) => {

    setProductValues({ ...productValues, deliveryAvailable: e.target.checked })
  }







  return (
    <>

      {productValues && (
        <form  onSubmit={handleSubmit}>
          <div className='container'>
            <h5 className='font-bold text-black'>Title</h5>
            <input
              type="text"
              required
              name="name"
              className="w-full  text-gray-900  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              placeholder="Product Title - e.g Strawberry Cake / Dogwalking 1 hour"
              value={productValues.name}
              onChange={handleChange}
            />
          </div>

          <br />


          <div className='container'>
            <h5 className='font-bold text-black'>Description</h5>
            <textarea
              name="description"
              placeholder="Description"
              required
              cols="7"
              rows="7"
              value={productValues.description}
              className="shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              onChange={handleChange}
            ></textarea>
          </div>
          <br />

          <div className='container'>
            <h5 className='font-bold text-black'>Select Product Type</h5>


            <select
              style={{ width: "100%" }}
              size="large"
              required
              value={productValues.category}
              name="category"
            
              onChange={handleChange}
              className='text-gray-900 '
            >

              <option value={'Food'}  >Food</option>
              <option value={"Beverage"}  >Beverage</option>
              <option value={"Crafts"}  >Crafts</option>
              <option value={"Tutoring"}  >Tutoring</option>
              <option value={"Pet Food"}  >Pet Food</option>
              <option value={"Pet Accessories"}  >Pet Accessories</option>
              <option value={"Pet Services"}  >Pet Services</option>
              <option value={"Delivery"}  >Delivery</option>
              <option value={"Other Services"}  >Other Services</option>
              <option value={"Other Products"}  >Other Products</option>





            </select>

            
          </div>
          <br />
          <div className='container'>
            <h5 className='font-bold text-black'>Price</h5>
            <input
              type="number"
              name="price"
              required
              className="w-full text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              placeholder="Product Price"
              value={productValues.price}
              min={0}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className='container'>
            <h5 className='font-bold text-black'>Delivery Available?</h5>
            <input
              type="checkbox"
              
              name="deliveryAvailable"
              checked={productValues.deliveryAvailable}

              value={productValues.deliveryAvailable}

              onChange={handleCheckBox}
            />
          </div>

          {productValues.deliveryAvailable ? <div className='container'>
            <h5 className='font-bold text-black'>Delivery Price (Optional)</h5>
            <span>Enter your delivery price if you offer delivery on the product</span>
            <input
              type="number"
              name="deliveryPrice"
              min={0}
              className="w-full text-gray-900  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              placeholder="Delivery Price"
              value={productValues.deliveryPrice}
              onChange={handleChange}
            />
          </div> : <></>}


          {
            productValues.mainImage ?
              <span class="relative inline-block">
                <Avatar key={productValues.mainImage} src={productValues.mainImage} size={20} shape="square" className='w-5' />
                <span onClick={() => handleMainImageRemove(productValues.mainImage)}
                  class="absolute top-0 right-0 px-2 py-1 text-xs font-bold leading-none text-red-100 transform bg-red-600 rounded-full cursor-pointer">x</span>
              </span> : <></>
          }


          <div className=''>
            <h5 className='font-bold py-4 text-black'>Upload Main Product Image</h5>
            {uploadMainImageLoading ? <span>Uploading</span> : <label

              className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleMainImage} />
              Upload Main Image
            </label>}

          </div>

          <br/>

          <div className='container'>
            <h5 className='font-bold text-black'>Main Product Alt Text</h5>
            <span>Describe your main product image. This is useful for SEO</span>
            <input
              type="text"
              name="mainImageAlt"
              className="w-full text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              placeholder="Picture of a freshly baked strawberry cake"
              value={productValues.mainImageAlt}
              onChange={handleChange}
            />
          </div>







          <br />
          {images ? images.map((image) => (




            <span class="relative inline-block">
              <Avatar key={image} src={image} size={20} shape="square" className='w-5' />
              <span onClick={() => handleImageRemove(image)}
                class="absolute top-0 right-0 px-2 py-1 text-xs font-bold leading-none text-red-100 transform bg-red-600 rounded-full cursor-pointer">x</span>
            </span>


          )) : <></>}




      




          <div className=''>
            <h5 className='font-bold py-4 text-black'>Upload Other Product Images</h5>
            {loading ? <span>Uploading</span> : <label className="ml-5 p-6  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Upload Images
              <input
                type="file"
                name="image"
                multiple
                className='w-full'
                onChange={handleImage}
                accept="image/*"
                hidden
              />
            </label>}

          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse text-black">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
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






        </form>
      )}
    </>
  )
}

export default EditProductForm