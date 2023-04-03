import { useEffect,useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
function IndexPage() {
  const [allPlaces,setAllPlaces]=useState([])
  useEffect(()=>{
    axios.get('/places').then(response=>
      setAllPlaces(response.data)
      )
  },[])
  return (
    <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
     {allPlaces.length>0 && allPlaces.map(place=>{
      return (
        <Link to={'/places/' +place._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
          {place.photos.length>0 && <img className="object-cover aspect-square rounded-2xl" src={"http://localhost:4000/uploads/"+place.photos?.[0]}/>}
          </div>
          <h3 className="font-bold">{place.adress}</h3>
         <h1 className="text-sm text-gray-600">{place.title}</h1>
         <div className="m-1">
          <span className="font-bold">₹{place.price} per night</span>
         </div>
        </Link>
      )
     })}
    </div>
  )
}

export default IndexPage