import { useContext, useState } from 'react'
import {Link, Navigate} from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'

function LoginPage() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [redirect,setRedirect]=useState(false)

  const {user,setUser}=useContext(UserContext)
  const loginUser=async(e)=>{
e.preventDefault()
try {
 const res= await axios.post('/login',{email,password})
 setUser(res.data)
  setRedirect(true)
} catch (error) {
  console.log(error)
}
}
if(redirect){
  return <Navigate to='/'/>
}
  return (
    <div  className="m-4 flex grow justify-around items-center">
        <div className="mb-32">
        <h1 className="text-center text-4xl mb-2">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={loginUser}>
            <input type='email' placeholder="yourname@email.com" value={email} onChange={e=>setEmail(e.target.value)}/>
            <input type='password' placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className="primary">Login</button>
            <div className="py-2 text-gray-500 text-center">
              Don't have an account yet?<Link className='text-black underline' to='/register'>Register</Link>
            </div>
        </form>
        </div>
    </div>
  )
}

export default LoginPage