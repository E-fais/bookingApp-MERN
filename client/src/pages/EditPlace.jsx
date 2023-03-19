import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../comoponents/Perks";

function EditPlace() {
  const [title, setTitle] = useState("");
  const [adress, setAdress] = useState("");
  const [photosAdded, setPhotosAdded] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const { id } = useParams();
  useEffect(() => {
    axios.get("/places/" + id).then((res) => {
      setTitle(res.data.title);
      setAdress(res.data.adress);
      setPhotosAdded(res.data.photos);
      setDescription(res.data.description);
      setPerks(res.data.perks);
      setExtraInfo(res.data.extraInfo);
      setCheckIn(res.data.checkIn);
      setCheckOut(res.data.checkOut);
      setMaxGuests(res.data.maxGuests);
    });
  }, []);
  async function savePlace(e) {
    e.preventDefault();
    axios.put("/places", {
      id,
      title,
      adress,
      photosAdded,
      extraInfo,
      perks,
      maxGuests,
      checkIn,
      checkOut,
      description,
    });

    window.location.href = "/account/accommodations";
  }

  const uploadBylink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setPhotosAdded((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  };

  const uploadPhoto = (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((res) => {
        const { data: filenames } = res;
        setPhotosAdded((prev) => {
          return [...prev, ...filenames];
        });
      });
  };
  function removePhotos(photoId){
    setPhotosAdded([...photosAdded.filter((photo)=>
    photo!==photoId)])
   }
   function makeItMainPhoto(e,selectedPhoto){
    e.preventDefault()
    setPhotosAdded([selectedPhoto,...photosAdded.filter(photo=>photo!==selectedPhoto)])
  }
  return (
    <div>
      <form onSubmit={savePlace}>
        <h2 className="text-2xl mt-4">Title</h2>
        <p className="text-gray-500 text-sm">
          Title shuould be short and catchy
        </p>

        <input
          type="text"
          placeholder="eg:Tez resort"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <h2 className="text-2xl mt-4">Adress</h2>
        <p className="text-gray-500 text-sm">Adress to this place</p>

        <input
          type="text"
          placeholder="adress"
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
        />

        <h2 className="text-2xl mt-4">Photos</h2>
        <p className="text-gray-500 text-sm">More = Better</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="paste link here..."
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
          />

          <button
            onClick={uploadBylink}
            className="bg-gray-300 rounded-2xl px-6  "
          >
            Add&nbsp;Photo
          </button>
        </div>
        <div className="mt-2 grid gap-x-6 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {photosAdded.length > 0 &&
            photosAdded.map((link) => {
              return (
                <div className="h-32 flex gap-1 relative" key={link}>
                  {
                    <img
                      className="w-full rounded-2xl object-cover"
                      src={"http://localhost:4000/uploads/" + link}
                      alt="room"
                    />
                  }
                  <div className="absolute bottom-0 right-1 mb-1 cursor-pointer bg-black text-white opacity-50 px-2 py-2 rounded-xl">
                 <button onClick={()=>removePhotos(link)}> 
                 <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    </button> 
                  </div>
                  <div className="absolute bottom-0 left-1 mb-1 cursor-pointer bg-black text-white opacity-70 px-2 py-2 rounded-xl">
                      <button onClick={(e) => makeItMainPhoto(e,link)}>
                       {link==photosAdded[0]? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg> ) : (<svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          />
                        </svg>)
                        }
                      </button>
                    </div>
                </div>
              );
            })}
        </div>
        <div className="grid  grid-cols-3 md:grid-cols-4 lg:grid-col-6 gap-2">
          <label
            onChange={uploadPhoto}
            className="border cursor-pointer bg-transparent rounded-2xl p-8 mt-2 text-2xl text-gray-600 flex justify-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            <input type="file" className="hidden" name="photos" multiple />
            Upload
          </label>
        </div>
        <h2 className="text-2xl mt-4">Description</h2>
        <p className="text-gray-500 text-sm">
          Give a description about your place
        </p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Perks perks={perks} setPerks={setPerks} />

        <h2 className="text-2xl mt-4">Extra info</h2>
        <p className="text-gray-500 text-sm">
          House rules , additional informations etc
        </p>
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        <h2 className="text-2xl mt-4">Check in and out time</h2>
        <p className="text-gray-500 text-sm">
          add check in and out time details.
        </p>
        <div className="gap-2 grid sm:grid-cols-3">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              placeholder="12.00 PM"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              placeholder="11.00 AM"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Maximum number of guests</h3>
            <input
              placeholder="1"
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}

export default EditPlace;
