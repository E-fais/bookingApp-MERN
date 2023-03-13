import { Link, useParams } from "react-router-dom";
import Perks from "../comoponents/Perks";
import { useState } from "react";
import axios from "axios";

export default function PlacesPage() {
  const { action } = useParams();
  
  const [title,setTitle]=useState('')
  const [adress,setAdress]=useState('')
  const [photosAdded,setPhotosAdded]=useState([])
  const [photoLink,setPhotoLink]=useState('')
  const [description,setDescription]=useState('')
  const [perks,setPerks]=useState([])
  const [extraInfo,setExtraInfo]=useState('')
  const [checkIn,setCheckIn]=useState('')
  const [checkOut,setCheckOut]=useState('')
  const [maxGuests,setMaxGuests]=useState(1)

  const uploadBylink=async(e)=>{
    e.preventDefault()
    const{data:filename}=await axios.post('/upload-by-link',{link:photoLink})
    setPhotosAdded(prev=>{
      return ([...prev,filename])
    })
    setPhotoLink('')
  }
  
 const uploadPhoto=(e)=>{
  const files=e.target.files
  const data=new FormData()
  for(let i=0; i<files.length;i++){
    data.append('photos',files[i])
  }
  axios.post('/upload',data,{
    headers:{'Content-type':'multipart/form-data'} 
  }).then(res=>{
    const {data:filenames}=res;
  setPhotosAdded(prev=>{
    return [...prev,...filenames]
  })  
  })
}
  return (
    <>
      <div className="text-center">
        {action !== "new" && (
          <Link
            className="inline-flex text-center gap-1 bg-primary rounded-full text-white py-2 px-6"
            to="/account/accommodations/new"
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        )}
      </div>
      {action === "new" && (
        <form>
          <h2 className="text-2xl mt-4">Title</h2>
          <p className="text-gray-500 text-sm">
            Title shuould be short and catchy
          </p>

          <input type="text" placeholder="eg:Tez resort" 
           value={title} onChange={e=>setTitle(e.target.value)}/>

          <h2 className="text-2xl mt-4">Adress</h2>
          <p className="text-gray-500 text-sm">Adress to this place</p>

          <input type="text" placeholder="adress" 
          value={adress} onChange={e=>setAdress(e.target.value)} />

          <h2 className="text-2xl mt-4">Photos</h2>
          <p className="text-gray-500 text-sm">More = Better</p>
          <div className="flex gap-2">

            <input type="text" placeholder="paste link here..." 
            value={photoLink} onChange={e=>setPhotoLink(e.target.value)}/>

            <button onClick={uploadBylink}
            className="bg-gray-300 rounded-2xl px-6  ">
              Add&nbsp;Photo
            </button>
          </div>
          <div className="mt-2 grid gap-x-6 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {photosAdded.length>0 && photosAdded.map(link=>{
              return <div className="h-32 flex gap-1">
               {
                <img className="w-full rounded-2xl object-cover"
                 src={'http://localhost:4000/uploads/'+link} alt='room'/>
               }
              </div>
            })}
            </div>
          <div 
          className="grid  grid-cols-3 md:grid-cols-4 lg:grid-col-6 gap-2">
            <label onChange={uploadPhoto} 
             className="border cursor-pointer bg-transparent rounded-2xl p-8 mt-2 text-2xl text-gray-600 flex justify-center gap-1">
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
              <input type='file' className="hidden" name="photos" multiple/>
              Upload
           
            </label>
          </div>
          <h2 className="text-2xl mt-4">Description</h2>
          <p className="text-gray-500 text-sm">
            Give a description about your place
          </p>
          <textarea value={description} onChange={e=>setDescription(e.target.value)} />
         <Perks perks={perks} setPerks={setPerks} />
          <h2 className="text-2xl mt-4">Extra info</h2>
          <p className="text-gray-500 text-sm">
            House rules , additional informations etc
          </p>
          <textarea  value={extraInfo} onChange={e=>setExtraInfo(e.target.value)}/>
          <h2 className="text-2xl mt-4">Check in and out time</h2>
          <p className="text-gray-500 text-sm">
           add check in and out time details.
          </p>
          <div className="gap-2 grid sm:grid-cols-3">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <input type='text' placeholder="12.00 PM" 
              value={checkIn} onChange={e=>setCheckIn(e.target.value)}/>
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input type='text'  placeholder="11.00 AM" 
              value={checkOut} onChange={e=>setCheckOut(e.target.value)}/>
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Maximum number of guests</h3>
              <input placeholder="1" type='number'
              value={maxGuests} onChange={e=>setMaxGuests(e.target.value)}/>
            </div>
          </div>
          <button className="primary my-4">Save</button>
        </form>
      )}
    </>
  );
}
