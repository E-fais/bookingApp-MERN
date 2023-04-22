import { useState } from "react";
export default function PlaceGallery({place}){
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    if (showAllPhotos) {
        return (
          <div className="absolute min-h-screen w-full bg-black text-white mt-2 " >
            <div className="justify-center flex-col">
              <button
                onClick={() => setShowAllPhotos(false)}
                className="fixed top-38 right-9   bg-white text-black shadow-black  px-3 py-2 cursor-pointer rounded-2xl flex gap-1"
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
        <div className=" w-100% h-100% ">
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
        </div>
    )
}