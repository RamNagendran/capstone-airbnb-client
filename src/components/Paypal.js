import React from 'react'
import "../styles/Paypal.css";
import paypalbg from "../styles/paypalbg.png"
import paypalCard from "../styles/paypal-bgg.png"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';
import { commonActions } from '../redux/State';


const Paypal = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userDetails, authToken, bookedDates } = useSelector(state => state.common)
    let placesName = props.nameOfPlace;
    let price1 = props.initialPrice;
    let numOfDays = props.daysSelected;
    const totalPrice = (price1 * numOfDays) + 240 + 65
    const confirmation_no = `${Math.floor(Math.random() * (999 - 100 + 1) + 100)}ABKQ`

    
    async function bookSlot() {
        let data = {
            username: userDetails.username,
            user_id: userDetails.id,
            place_id: props.placeId,
            dates: {
                startDate: bookedDates.startDate,
                endDate: bookedDates.endDate,
                days: numOfDays,
            },
            total_amount: totalPrice,
            issuer: 'Fairbnb',
            confirmation_no,
            receiptfor: placesName
        }
        try {
            const res = await axios.post('book-slot', data, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })
            if (res && res?.data && res?.data?.acknowledged) {
                toast.success('Slot booked successfully!!', {
                    hideProgressBar: true
                })
                fetchBookedSlots()
                navigate(`/`)
            }
        } catch (e) {
            toast.error(`something went wrong : ${e?.response?.data?.message}`, {
                hideProgressBar: true
            })
        }
    }

    async function fetchBookedSlots() {
        try {
          const res = await axios.get('get-bookedSlots', {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          })
          if (res && res?.data) {
            dispatch(commonActions.setBookedSlots({bookedSlots: res.data}))
          }
        } catch (e) {
          toast.error("Error fetching reviews, try again later!!", {
            hideProgressBar: true
          })
        }
      }



    return (
        <div className='pa'>
            <div className='paypalbghold hidden lg:block'>
                <img alt='adsf' src={paypalbg} className="paypalbg" />
            </div>

            <div className='paypalCardHold'>
                <img alt='adsf' src={paypalCard} className="paypalcard" />

            </div>

            <div className='figure-hold3'>
                <p className='val'> ${price1}  </p>

                <p className='val'> {numOfDays} days </p>

                <p className='val'> Fairbnb</p>
            </div>

            <div className='reciptFor'>
                <p>{placesName}</p>
            </div>


            <div className='heading-hold2'>
                days:
            </div>

            <div className='confirmnum'>
                <p>{confirmation_no}</p>
            </div>

            <div className='paypalLogo2'>
                <img alt='adsf' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/553128/PayPal.svg' />
            </div>

            <div className='stayAt2'>
                <p>Stay At {placesName}</p>
            </div>

            <div className='totalCard2 flex gap-4 bg-white font-semibold'>
                <p>TOTAL</p>
                <p>${totalPrice}</p>
            </div>

            <div className="hello2 flex flex-col justify-between absolute gap-3 bg-white italic  text-lg">
                <p>Hello {userDetails?.username}</p>

                <p>You Are About To Pay ${totalPrice}</p>
                <button  onClick={bookSlot} style={{ height: "35px", width: "75%", fontSize: "18px", fontWeight: 700, color: "#fff", backgroundColor: "#9304ab", borderRadius: "8px", outline: 0 }} >Book your slot</button>
            </div>
        </div>
    )
}


export default Paypal

