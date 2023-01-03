/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import Header from '../../../components/Header'
import { useRouter } from 'next/router'
import { AuthContext } from '../../../context/useAuth'
import Image from 'next/image'
import { axiosAuth, axiosPublic } from '../../../actions/axios'
import toast from 'react-hot-toast'

const ReviewPage = () => {
  const {
    state: { authenticated, user },
  } = useContext(AuthContext)
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [userReview, setUserReview] = useState('')
  const [userRating, setUserRating] = useState(0)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    if (!router.isReady) return

    fetchReviews()
  }, [router.isReady])

  const notify = (message, success) =>
    toast(message, {
      style: {
        border: success ? '1px solid green' : '1px solid red',
      },
    })

  const fetchReviews = async () => {
    let reviews = await axiosPublic.get(
      `/fetch-reviews-product/${router.query.product}`,
      {}
    )

    setReviews(reviews.data)
    //check if user already wrote review
    if (authenticated) {
      let userAlreadyReviewed = await axiosAuth.get(
        `fetch-review-by-user/${router.query.product}`,
        {}
      )
      if (userAlreadyReviewed) {
        setUserRating(userAlreadyReviewed.data.userRating)
        setUserReview(userAlreadyReviewed.data.userReview)
      } else {
      }
    }
  }

  const submitReviewHandler = async (e) => {
    e.preventDefault()
    if (!authenticated) {
      notify('Please login to leave a review', false)
      return
    }
    if (userReview && userRating) {
      let userSubmit = await axiosAuth.post(
        `add-review-to-shop/${router.query.product}`,
        {
          body: {
            userRating: userRating,
            userReview: userReview,
            productId: router.query.product,
          },
        }
      )

      if (userSubmit.data.ok == true) {
        //UI change
        notify('Submitted Successfully', true)
      } else {
        notify(userSubmit.data.message, false)
      }
    } else {
      notify('Please enter your rating and review', false)
    }
  }
  return (
    <div>
      <div className='min-h-full'>
        <Header />
        {/* reviews */}
        <div className='flex flex-col items-center justify-center'>
          <p className='text-base leading-4 font-bold text-black pt-5 pb-5 '>
            Reviews for {router.query.productName}
          </p>
          <p className='text-base leading-4  text-black pb-5 italic'>
            Only verified purchasers may leave a review
          </p>
          <div className='w-full '>
            <form className='p-10' onSubmit={submitReviewHandler}>
              <div>
                <h2 className='font-bold text-black pb-4'>Your review</h2>
              </div>
              <div>
                <label className='text-black pr-5' htmlFor='rating'>
                  Rating
                </label>
                <select
                  className='w-1/2 border-2'
                  value={userRating}
                  onChange={(e) => setUserRating(e.target.value)}
                >
                  <option value=''>Select...</option>
                  <option value='1'>1- Poor</option>
                  <option value='2'>2- Fair</option>
                  <option value='3'>3- Good</option>
                  <option value='4'>4- Very good</option>
                  <option value='5'>5- Excellent</option>
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
                <button
                  className='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
            text-base
            flex
            items-center
            justify-center
            leading-none
            text-white
            bg-gray-800
            rounded
            w-full
            p-5
            hover:bg-gray-700'
                  type='submit'
                >
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
            <h4 className='font-bold text-black p-10'>Review(s)</h4>
            <div className='flex flex-col items-center justify-center '>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div
                    key={review.postedByName}
                    className='container p-5 shadow-sm  '
                  >
                    <p className='font-bold pb-3 '>
                      {' '}
                      Review by {review.postedByName}{' '}
                    </p>
                    <span>
                      {' '}
                      {review.userRating == 0 ? (
                        <div className='flex flex-row'>
                          <Image
                            src='/blackstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/blackstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/blackstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />
                          <Image
                            src='/blackstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/blackstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                        </div>
                      ) : review.userRating == 1 ? (
                        <div className='flex flex-row'>
                          <Image
                            src='/yellowstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/blackstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/blackstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/blackstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/blackstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                        </div>
                      ) : review.userRating == 2 ? (
                        <div className='flex flex-row'>
                          <Image
                            src='/yellowstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/yellowstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/blackstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/blackstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/blackstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                        </div>
                      ) : review.userRating == 3 ? (
                        <div className='flex flex-row'>
                          <Image
                            src='/yellowstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/yellowstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/yellowstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/blackstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/blackstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                        </div>
                      ) : review.userRating == 4 ? (
                        <div className='flex flex-row'>
                          {' '}
                          <Image
                            src='/yellowstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/yellowstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/yellowstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/yellowstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/blackstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                        </div>
                      ) : review.userRating == 5 ? (
                        <div className='flex flex-row'>
                          <Image
                            src='/yellowstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/yellowstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/yellowstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/yellowstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                          <Image
                            src='/yellowstar.png'
                            alt='me'
                            width='20'
                            height='20'
                          />{' '}
                        </div>
                      ) : (
                        <></>
                      )}
                    </span>
                    <p className='pb-5 pt-5'>{review.userReview}</p>
                  </div>
                ))
              ) : (
                <div className='h-screen'>
                  <h4 className='p-5'>No reviews yet</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewPage
