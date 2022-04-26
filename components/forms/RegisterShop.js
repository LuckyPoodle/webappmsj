import { useState } from "react";


import Resizer from "react-image-file-resizer";

import { axiosAuth } from "../../actions/axios";

import SearchBox from "../searchBox";

import toast, { Toaster } from 'react-hot-toast';
//shopTitle, slug,shopImage,description,mainLocation,address,owner

// shopTitle: "A Poet's Corner",
// description: "A Shop For All Poets",
// slug: "poet-corner",
// shopImage: "",
// mainLocation:"The Tower of Destinies",
// address: "The Burnt Palace",

const RegisterShopForm = ({


}) => {

  const notify = (message, success) => toast(message, {
    style: {
      border: success ? '1px solid green' : '1px solid red',
    },
  });



  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [showImageDeleteButton, setShowImageDeleteButton] = useState(false);

  const [values, setValues] = useState({
    shopName: '',
    address: '',
    latitude: 0,
    longitude: 0,
    description: '',
    siteLinkOne: "",
    siteLinkTwo: "",
    siteLinkThree: "",
    siteLinkFour: "",
    shopContactEmail:"",
    shopContactNumber:"",
    bankAccountNumber:"",
    bankName:""


  });

  const [image, setImage] = useState("");


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


  const handleChange = (e) => {
    console.log('handleChange');
    setValues({ ...values, [e.target.name]: e.target.value });


  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    console.log(image);

    try {
      console.log(values);

      console.log("HANDLE SUBMIT")
      const { data } = await axiosAuth.post("/create-shop", { body: { values: values, image: image }, });
      console.log(data);

      notify('Created. Please refresh page', true)

      //router.push("/instructor");
    } catch (err) {
      notify('Something went wrong', false)
    }



  };


  // const onSubmit = (data) => {

  //   console.log('SUBMIT')
  //   alert(JSON.stringify(data));
  //   handleCreate(data);
  // };

  const handleCreate = async (data) => {

  }




  return (
    <form className="" onSubmit={handleSubmit}>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Enter your shop details</h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">

            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                      Shop Name
                    </label>
                    <p>* Please choose wisely. Shop name cannot be edited. </p>
                    <div className="mt-1 flex rounded-md shadow-sm">

                      <input
                        type="text"
                        name="shopName"
                        onChange={handleChange}
                        id="shopName"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="E.g Cheerful Donuts"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                      Shop Contact Email
                    </label>
           
                    <div className="mt-1 flex rounded-md shadow-sm">

                      <input
                        type="text"
                        name="shopContactEmail"
                        onChange={handleChange}
                        id="shopContactEmail"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="E.g example@example.com"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                      Shop Contact Number
                    </label>
           
                    <div className="mt-1 flex rounded-md shadow-sm">

                      <input
                        type="text"
                        name="shopContactNumber"
                        onChange={handleChange}
                        id="shopContactNumber"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="E.g 91234567"
                      />
                    </div>
                  </div>
                </div>
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
                </div>
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
                        placeholder="E.g xxxx-xxxx-xxxx"
                      />
                    </div>
                  </div>
                </div>

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
                  </div>


                  <div>
                    <label htmlFor="Location" className="block text-sm font-medium text-gray-700">
                      Select Your Shop Location
                    </label>
                    <div className="mt-1">
                      <SearchBox className='z-50' onSelectAddress={(address, latitude, longitude) => {

                        setValues({ ...values, "latitude": latitude, "address": address, "longitude": longitude });

                      }} defaultValue="" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">

                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">External Links</label>
                  <div class="grid grid-cols-2 gap-2">
                    <div>
                      <h5>External URL Link 1 *</h5>

                      <input
                        type="text"
                        name="siteLinkOne"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="E.g External Blog URL"
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <h5>External URL Link 2 *</h5>

                      <input
                        type="text"
                        name="siteLinkTwo"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="E.g External Blog URL"
                        onChange={handleChange}
                      />
                    </div>



                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <div>
                      <h5>External URL Link 3 *</h5>

                      <input
                        type="text"
                        name="siteLinkThree"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="E.g External Blog URL"
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <h5>External URL Link 4 *</h5>

                      <input
                        type="text"
                        name="siteLinkFour"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="E.g External Blog URL"
                        onChange={handleChange}
                      />
                    </div>



                  </div>



                </div>

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
                </div>

                {/* <div>
                    <label className="block text-sm font-medium text-gray-700">Shop Profile Image</label>
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
                        <div className="flex text-sm text-gray-600">
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
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                {loading ? <span>Uploading</span> : <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>}
              </div>
            </div>

          </div>
        </div>
      </div>

    </form>

  );
};

export default RegisterShopForm;
