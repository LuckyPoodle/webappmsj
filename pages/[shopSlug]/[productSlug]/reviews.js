import React, { useState,useEffect } from 'react'
import Header from '../../../components/Header'
import { useRouter } from "next/router";
const ReviewPage = () => {


  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const [userPurchasedProduct,setUserPurchasedProduct]=useState(false);
  

  useEffect(()=>{

    console.log('In Reviews UseEffect')
    console.log(router.query.product);
    //fetch reviews of product
    


    //check if user has purchased the product

  },[])

  const submitReviewHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {

    } else {
      alert('Please enter comment and rating');
    }
  };
  return (
    <div className='w-screen'>
      <Header />
      {/* reviews */}
      <div className='flex flex-col items-center justify-center'>
        <p className="text-base leading-4 font-bold text-black pt-5 pb-5 ">Reviews</p>
        <div className=' p-6 border-4 w-1/2 '>
          <form className="form" onSubmit={submitReviewHandler}>
            <div>
              <h2 className='font-bold text-black' >Write a review</h2>
            </div>
            <div>
              <label className='text-black pr-5' htmlFor="rating">Rating</label>
              <select

                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option  value="">Select...</option>
                <option value="1">1- Poor</option>
                <option value="2">2- Fair</option>
                <option value="3">3- Good</option>
                <option value="4">4- Very good</option>
                <option value="5">5- Excelent</option>
              </select>
            </div>
            <div>
              <div className='col'>
                <p className=' text-black'>Comment </p>
                <textarea

                  value={comment}
                  className='border-2 w-full'
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div>

              <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
            text-base
            flex
            items-center
            justify-center
            leading-none
            text-white
            bg-gray-800
            w-full
            py-4
            hover:bg-gray-700" type="submit">
                Submit
              </button>
            </div>
            <div>
              {/* {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )} */}
            </div>
          </form>
        </div>
        <div className='container h-1/4 overflow-y-scroll'>
          <div className='flex flex-col '>
            <div className='container p-5 shadow-md'>
              <p className='font-bold pb-3 '>Review Title </p>
              <span> *****</span>
              <p className='pb-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p className='italic pb-3'>By Reviewer Name</p>
            </div>

            <div className='container p-5 shadow-md'>
              <p className='font-bold pb-3 '>Review Title </p>
              <span> *****</span>
              <p className='pb-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p className='italic pb-3'>By Reviewer Name</p>
            </div>

            <div className='container p-5 shadow-md'>
              <p className='font-bold pb-3 '>Review Title </p>
              <span> *****</span>
              <p className='pb-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p className='italic pb-3'>By Reviewer Name</p>
            </div>

            <div className='container p-5 shadow-md'>
              <p className='font-bold pb-3 '>Review Title </p>
              <span> *****</span>
              <p className='pb-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p className='italic pb-3'>By Reviewer Name</p>
            </div>

            <div className='container p-5 shadow-md'>
              <p className='font-bold pb-3 '>Review Title </p>
              <span> *****</span>
              <p className='pb-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p className='italic pb-3'>By Reviewer Name</p>
            </div>


            <div className='container p-5 shadow-md'>
              <p className='font-bold pb-3 '>Review Title </p>
              <span> *****</span>
              <p className='pb-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p className='italic pb-3'>By Reviewer Name</p>
            </div>

            <div className='container p-5 shadow-md'>
              <p className='font-bold pb-3 '>Review Title </p>
              <span> *****</span>
              <p className='pb-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p className='italic pb-3'>By Reviewer Name</p>
            </div>



          </div>
        </div>

      </div>



    </div>
  )
}

export default ReviewPage