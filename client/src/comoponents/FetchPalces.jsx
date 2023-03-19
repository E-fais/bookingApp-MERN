import axios from "axios"
import { useEffect,useState } from "react"
import { Link, useParams } from "react-router-dom"

function FetchPalces() {
    const [places,setPlaces]=useState()
    useEffect(()=>{
        axios.get('/places').then(({data})=>
            setPlaces(data))
    },[])
    const {id}=useParams()
  return (
    <div className="mt-4">
        {places?.map(place=>
            <Link to={'/places/'+place._id} 
            className="bg-gray-100 rounded-2xl p-4 m-2 flex gap-2">
             <div className="bg-gray-500 w-32 h-32 shrink-0 flex">
             {place.photos.length>0 &&  <img className="object-cover" src={"http://localhost:4000/uploads/"+place.photos[0]}/>}
              </div>
              <div className="grow-0 shrink">
              <h2 className="text-2xl">{ place.title}</h2>
              <p className="mt-2 ">{place.description}
              </p>
              </div>
            </Link>
            )}
    </div>
  )
}

export default FetchPalces