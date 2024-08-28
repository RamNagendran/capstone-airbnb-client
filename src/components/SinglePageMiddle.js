import React, { useCallback, useEffect } from 'react';
import "../styles/SinglePageMiddle.css";
import section3 from "../styles/av.png";
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import rev1 from "../styles/stars1.png";
import rev2 from "../styles/stars2.png";
import reviews from "../styles/rev.png";
import modalPic from "../styles/pic.png";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { commonActions } from '../redux/State';

const SinglePageMiddle = () => {
    const { id } = useParams();
    const {placesStore, selectedReviews, authToken} = useSelector(state => state.common);
    const placeClicked = placesStore && placesStore?.find((item) => item.id === id);
    const { stars } = placeClicked || {};
    const dispatch = useDispatch();

    const getSelectedReviews = useCallback(async () => {
        try {
            const res = await axios.get('selectedPlace-reviews', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (res && res?.data) {
                dispatch(commonActions.setSelectedReview({ selectedReviews: res?.data }));
            }
        } catch (err) {
            toast.error(`Something went wrong: ${err?.response?.data?.message}`);
        }
    }, [authToken, dispatch]);


    useEffect(() => {
        getSelectedReviews()
    }, [getSelectedReviews])


    return (
        <div>
            <p className='spmLine text-gray-300'>
                __________________________________________________________________________________________________________
            </p>

            <div className='section1-hold'>
                <img
                    src='https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg'
                    className='w-36'
                    alt='Booking protection'
                />
                <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
                <p className='font-bold text-xl underline'>Learn more</p>
            </div>

            <p className='spmLine2 text-gray-300'>
                __________________________________________________________________________________________________________
            </p>

            <div className='section2-hold'>
                <p>Your perfect little staycation in Bali is right here. We take relaxation seriously.</p>
                <p>Hideout is a unique eco stay hidden in the mountains of Gunung Agung volcano - far from the city life it acts as the perfect hideaway for all adventurous travellers. We are honoured to be the number 4 most wished accommodation at Airbnb in the</p>
                <p className="font-bold text-xl underline">Show more</p>
            </div>

            <div className='section3'>
                <img
                    src={section3}
                    className="c"
                    alt='Eco stay in the mountains'
                />
            </div>

            <p className='spmLine3 text-gray-300'>
                __________________________________________________________________________________________________________
            </p>

            <div className='spm-star'>
                <FaStar className='text-2xl st' />
            </div>

            <p className='spm-rev text-2xl'>{stars}</p>

            <div className='star-calc-hold'>
                <img
                    src={rev1}
                    className="spm-pic"
                    alt='Star rating calculation 1'
                />
                <img
                    src={rev2}
                    className="spm-pic"
                    alt='Star rating calculation 2'
                />
            </div>

            <div className='review-hold'>
                <img
                    src={reviews}
                    className="spm-review"
                    alt='Reviews'
                />
            </div>

            <div className='agg'>
                <label htmlFor="my-modal-5" className="modal-button spm-rev-btn rounded-2xl btn">
                    Show 15 More Reviews
                </label>

                <input type="checkbox" id="my-modal-5" className="modal-toggle" />
                <label htmlFor="my-modal-5" className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                        <FaStar className='modal-star' />
                        <p className='modal-review font-semibold'>{stars}, 15 reviews</p>
                        <img
                            src={modalPic}
                            className="modal-pic"
                            alt='Modal content'
                        />
                        <div className='modal-hold'>
                            {selectedReviews && selectedReviews?.length > 0 && selectedReviews.map((items, index) => {
                                return (
                                    <React.Fragment key={index} >
                                        <h3 className="text-lg font-bold uppercase">~ {items?.header}</h3>
                                        <p className="py-4">{items?.content}</p>                                    
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    </label>
                </label>
            </div>
        </div>
    );
}

export default SinglePageMiddle;