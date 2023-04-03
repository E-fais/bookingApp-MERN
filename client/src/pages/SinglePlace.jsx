import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BookingWidgets from "../comoponents/BookingWidgets";

function SinglePlace() {
  const { id } = useParams();
  const [place, setPlace] = React.useState();
  const [showAllPhotos, setShowAllPhotos] = React.useState(false);
  useEffect(() => {
    axios.get(`/places/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, [id]);

  if (!place) {
    return "";
  }
  if (showAllPhotos) {
    return (
      <div className="absolute min-h-screen w-full bg-black text-white">
        <div className="justify-center flex-col">
          <button
            onClick={() => setShowAllPhotos(false)}
            className="fixed top-10 right-9   bg-white text-black shadow-black  px-3 py-2 cursor-pointer rounded-2xl flex gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Close Photos
          </button>
          <h2 className="text-2xl p-6 mr-4">Photos of {place.title}</h2>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => {
              return (
                <div className="grid place-content-center gap-2">
                  <img
                    className="object-cover object-center w-full mt-4 max-w-lg"
                    src={"http://localhost:4000/uploads/" + photo}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
  return (
    <div className="mt-4 bg-gray-100 px-8 -mx-8 py-8 ">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="flex gap-2 font-semibold underline my-3"
        target="_blank"
        href={"http://maps.google.com/?q=" + place.adress}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        {place.adress}
      </a>

      <div className="grid grid-cols-2 gap-1">
        <div className="flex items-center justify-end h-80">
          {place.photos?.[0] && (
            <img
              src={"http://localhost:4000/uploads/" + place.photos[0]}
              alt="Big Photo"
              className="h-full object-cover aspect-square  rounded-xl over-flow-hidden"
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-40 ">
            {place.photos?.[1] && (
              <img
                src={"http://localhost:4000/uploads/" + place.photos[1]}
                alt="Small Photo 1"
                className="h-full object-cover aspect-square  rounded-xl over-flow-hidden"
              />
            )}
          </div>
          <div className="h-40 relative ">
            {place.photos?.[2] && (
              <img
                src={"http://localhost:4000/uploads/" + place.photos[2]}
                alt="Small Photo 1"
                className="h-full object-cover aspect-square  rounded-xl over-flow-hidden"
              />
            )}
            {place.photos.length > 3 && (
              <button
                onClick={() => {
                  setShowAllPhotos(true);
                }}
                className="absolute bottom-2 left-11 py-1 px-3 shadow-md shadow-gray-500 bg-white rounded-2xl"
              >
                Show more
              </button>
            )}
          </div>
        </div>
      </div>

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
