import axios from 'axios'
import {differenceInCalendarDays} from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import {UserContext} from '../Context/UserContext'

export default function BookingWidgets({place}){
  const [checkIn,setCheckIn]=useState('')
  const [checkOut,setCheckOut]=useState('')
  const [numberOfGuests,setNumberOfGeusts]=useState(1)
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [mobile,setMobile] =useState('')
  const [redirect,setRedirect] =useState()
  let numberOfNights=0
  if (checkIn && checkOut){
    numberOfNights=differenceInCalendarDays(new Date(checkOut),new Date(checkIn))
  } 
const{user}=useContext(UserContext)
useEffect(()=>{
  if(user){setName(user.name)}
},[user])

  const bookRoom= async ()=>{
 const response=await axios.post('/booking',{
  checkIn,checkOut,numberOfGuests
  ,name,email,mobile,place:place._id,
  price:place.price*numberOfNights
})
const bookingId=response.data._id
setRedirect(`/account/bookings/${bookingId}`)
}
if(redirect){
  return <Navigate to={redirect}/>
}
    return (
        <div
          className="bg-white shadow
          rounded-2xl text-center pt-2"
        >
          <span className="text-2xl "> Price/Night : ₹ {place.price} </span>
          <div className="border rounded-2xl my-3 p-2 mx-1">
            <div className="flex gap-2">
              <div className="border-r">
                <label>Check In </label>
                <input type="date" value={checkIn}
                 onChange={e=>setCheckIn(e.target.value)} />
              </div>
              <div>
                <label>Check Out </label>
                <input type="date" value={checkOut}
                 onChange={e=>setCheckOut(e.target.value)}/>
              </div>
            </div>
            <div className="py-3 px-4 border-t">
              <label>Number of guests :</label>
              <input type="number" value={numberOfGuests}
              onChange={e=>setNumberOfGeusts(e.target.value)} />
            </div>
            {numberOfNights>0 && 
            (
              <>
              <div className="py-3 px-4 border-t">
              <label>Your Name</label>
              <input type="text" value={name}  placeholder='John Doe'
              onChange={(e)=>{setName(e.target.value)}}/>
        
              <label>Email</label>
              <input type="email" placeholder='email@example.com'
               value={email}
              onChange={(e)=>{setEmail(e.target.value)}}/>
              <label>Mobile Number</label>
              <input type="tel"  placeholder='mobile number'
               value={mobile}
              onChange={(e)=>{setMobile(e.target.value)}}/>
            </div>
            </>
            
            )
            }
          </div>

          <button onClick={user?bookRoom:()=>{alert('You must be logged in to book places.!')}}
           className="primary">
            Book this place
          {numberOfNights>0 && 
              <span>( ₹{numberOfNights*place.price} )</span>
          }
      
          </button>
        </div>
    )
}