import axios from "axios"
import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import PlaceGallery from "../comoponents/PlaceGallery"
import PlaceAdress from "../comoponents/PlaceAdress"
import BookingDates from "../comoponents/BookingDates"
export default function SingleBooking(){
    const [booking,setBooking]=useState(null)
    const {id}=useParams()
    useEffect(()=>{
        if(id){
            axios.get('/bookings')
            .then(responseBooking=>{
                const foundBooking=responseBooking.data
                .find(({_id})=>_id===id)
                if(foundBooking){
                    setBooking(foundBooking)
                }
            })
        
        }
    },[id])
    if(!booking){
        return ''
    }
    return (
        <div className="m-5 ">
          <h1 className="text-3xl ">{booking.place.title}</h1>
          <PlaceAdress >{booking.place.adress}</PlaceAdress>
          <div 
          className="bg-gray-300 rounded-2xl px-6 py-4 my-4 flex items-center justify-between">
           <div>
            <h1 className="font-semibold pb-1">Your booking informations:</h1>
          <BookingDates  booking={booking}/>
           </div>
           <div className="bg-primary text-white rounded-2xl p-4">
            <div>Total Price</div>
            <div className="text-2xl">₹{booking.price}</div>
           </div>
          </div>
         
          <PlaceGallery place={booking.place} />
          
        </div>
    )
} 