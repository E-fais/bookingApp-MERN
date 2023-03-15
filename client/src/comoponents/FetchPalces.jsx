import axios from "axios"
import { useEffect,useState } from "react"

function FetchPalces() {
    const [places,setPlaces]=useState()
    useEffect(()=>{
        axios.get('/places').then(({data})=>
            setPlaces(data))
    },[])
  return (
    <div>
        {places?.map(place=>
            <div>
               { place.title}
            </div>
            )}
    </div>
  )
}

export default FetchPalces