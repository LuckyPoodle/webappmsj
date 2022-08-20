import React, { useState,useEffect,useContext } from 'react';
import Header from '../../../components/Header';
import { useRouter } from "next/router";
import { AuthContext } from "../../../context/useAuth";
import { Context } from '../../../context'
import { axiosAuth,axiosPublic } from "../../../actions/axios";
import toast from 'react-hot-toast';


const ReviewPage = () => {

  const { state: { authenticated, user }, } = useContext(AuthContext);
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [userRating,setUserRating]=useState(0);
  const [reviews,setReviews]=useState([]);


useEffect(()=>{
    if(!router.isReady) return;

    fetchReviews();


}, [router.isReady]);

  const notify = (message, success) => toast(message, {
    style: {
      border: success ? '1px solid green' : '1px solid red',
    },
  });

  


  const fetchReviews=async()=>{
    let reviews=await axiosPublic.get(`/fetch-reviews-product/${router.query.product}`,{});
    alert('reviews!!');
    alert(JSON.stringify(reviews))
    setReviews(reviews.data);
    //check if user already wrote review
    if (authenticated){

      let userAlreadyReviewed=await axiosAuth.get(`fetch-review-by-user/${router.query.product}`,{});
      if (userAlreadyReviewed){
      
        setUserRating(userAlreadyReviewed.data.userRating);
        setUserReview(userAlreadyReviewed.data.userReview);
      }else{

  
      }
    }
 

  }

 

  const submitReviewHandler = async(e) => {
    e.preventDefault();
    if (userReview && userRating) {
      let userSubmit=await axiosAuth.post(`add-review-to-shop/${router.query.product}`,{
        body: { userRating:userRating,userReview:userReview,productId:router.query.product}
      });

     
      if (userSubmit.data.ok==true){
       //UI change
       notify('Submitted Successfully',true);

      }else{
 
        notify(userSubmit.data.message,false)
      }

    } else {
      alert('Please enter userRating and rating');
    }
  };
  return (
    <div className='w-screen'>
      <Header />
      {/* reviews */}
      <div className='flex flex-col items-center justify-center'>
        <p className="text-base leading-4 font-bold text-black pt-5 pb-5 ">Reviews for {router.query.productName}</p>
        <div className=' p-6 border-4 w-1/2 '>
          <form className="form" onSubmit={submitReviewHandler}>
            <div>
              <h2 className='font-bold text-black' >Your review</h2>
            </div>
            <div>
              <label className='text-black pr-5' htmlFor="rating">Rating</label>
              <select

                value={userRating}
                onChange={(e) => setUserRating(e.target.value)}
              >
                <option  value="">Select...</option>
                <option value="1">1- Poor</option>
                <option value="2">2- Fair</option>
                <option value="3">3- Good</option>
                <option value="4">4- Very good</option>
                <option value="5">5- Excellent</option>
              </select>
            </div>
            <div>
              <div className='col'>
                <p className=' text-black'>Your review </p>
                <textarea

                  value={userReview}
                  className='border-2 w-full'
                  onChange={(e) => setUserReview(e.target.value)}
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
        <div className='container h-screen overflow-y-scroll'>
          <div className='flex flex-col '>
           {reviews.length>0?reviews.map((review)=>
           (  <div className='container p-5 shadow-md'>
           <p className='font-bold pb-3 '> </p>
           <span> Rating : {review.userRating}</span>
           <p className='pb-5'>Review : {review.userReview}</p>
           <p className='italic pb-3'>----------{review.postedByName}</p>
         </div>
)
          
           ):<div className='h-screen'><h4 className='p-5'>No reviews yet</h4></div>}



          </div>
        </div>

      </div>



    </div>
  )
}

export default ReviewPage