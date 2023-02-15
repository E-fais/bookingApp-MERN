import { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from "axios"
function RegisterPage() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function registerUser(e){
        e.preventDefault()
        try{
          await axios.post('/register',{
              name,email,password
          })
          alert('Registrati0n Successful,now you can login')
        }
        catch(e){
          alert('Regisration failed,try again later')
        }
    }
  return (
    <div  className="m-4 flex grow justify-around items-center">
    <div className="mb-32">
    <h1 className="text-center text-4xl mb-2">Register</h1>

    <form 
    className="max-w-md mx-auto"
    onSubmit={registerUser}
    >
        <input type='text'
         placeholder='John Doe'
         value={name}
         onChange={(e)=>setName(e.target.value)}
         />
        <input type='email'
         placeholder="yourname@email.com"
         value={email}
         onChange={e=>setEmail(e.target.value)}
         />
        <input type='password' 
        placeholder="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <button className="primary">Register</button>
        <div className="py-2 text-gray-500 text-center">
          Already a member?<Link className='text-black underline' to='/login'>Login</Link>
        </div>
    </form>
    </div>
</div>
  )
}

export default RegisterPage