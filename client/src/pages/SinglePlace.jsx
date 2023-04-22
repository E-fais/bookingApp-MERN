import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BookingWidgets from "../comoponents/BookingWidgets";
import PlaceGallery from "../comoponents/PlaceGallery";
import PlaceAdress from "../comoponents/PlaceAdress";

function SinglePlace() {
  const { id } = useParams();
  const [place, setPlace] = React.useState();
  useEffect(() => {
    axios.get(`/places/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, [id]);

  if (!place) {
    return "";
  }
 
  return (
    <div className="mt-4 bg-gray-100 px-8 -mx-8 py-8 ">
      <h1 className="text-3xl">{place.title}</h1>
      <PlaceAdress>{place.adress}</PlaceAdress>
<PlaceGallery place={place}/>

      <div className="grid cols-1 md:grid-cols-[2fr_1fr] gap-6 mt-4">
        <div className="py-4 ">
          <div className="my-3">
            <h2 className="semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check In : {place.checkIn} <br />
          Check Out : {place.checkOut} <br />
          Maximum guests : {place.maxGuests}
         
        </div>
        <BookingWidgets place={place}/>
      </div>
      <div className="bg-white -mx-8 p-8 py-2 m-4 border-t">
      <div className="text-sm text-gray-700 ">
      <h2 className="semibold text-2xl">Extra Info</h2>
           {place.extraInfo}
          </div>
      </div>
      
    </div>
  );
}

export default SinglePlace;
