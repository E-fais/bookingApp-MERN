import React, { useContext ,useState} from 'react'
import {UserContext} from '../Context/UserContext'
import {Link, Navigate, useParams} from 'react-router-dom'
import axios from 'axios'
import PlacesPage from './PlacesPage'

function Account() {
  const {user,userReady,setUser}=useContext(UserContext)
  const [redirect,setRedirect]=useState()
  let {subpage}=useParams() 

  if(subpage===undefined){
    subpage='profile'
  }

  const logout=async()=>{
    await axios.post('/logout')
    setRedirect('/')
    setUser(null)

  }
  if(redirect){
    return <Navigate to='/'/>
  }

  // if(!userReady){
  //   return 'Loading...'
  // }
  if(userReady && !user &&!redirect){
    return <Navigate to='/login'/>
  }

  const stylingFunction=(type=null)=>{
    let tailwindClass='py-2 px-2 rounded-full'
    if(type===subpage){
      tailwindClass+=' bg-primary text-white '
    }else{
      tailwindClass+=" bg-gray-200"
    }
    return tailwindClass
  }
  

  return (
    <div>
      <nav className='w-full flex justify-center gap-2 mt-16 mb-9'>
        <Link className={stylingFunction('profile')} to='/account/'>My Profile</Link>
        <Link className={stylingFunction('bookings')} to='/account/bookings'>My Bookings</Link>
        <Link className={stylingFunction('accommodations')} to='/account/accommodations'>My Accommodations</Link>
      </nav>
      {subpage==='profile' &&(
        <div className='text-center max-w-lg mx-auto '>
         <p className='mb-3'> Logged in as {user.name}({user.email}) </p>
          <button onClick={logout} className='primary max-w-sm'>Logout</button>
        </div> 
      )}
      
      {subpage==='accommodations' && <PlacesPage/>}
      {subpage==='bookings' && <MyBookings/>}

    </div>
  )
}

export default Account