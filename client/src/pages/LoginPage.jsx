import {Link} from 'react-router-dom'

function LoginPage() {
  return (
    <div  className="m-4 flex grow justify-around items-center">
        <div className="mb-32">
        <h1 className="text-center text-4xl mb-2">Login</h1>
        <form className="max-w-md mx-auto">
            <input type='email' placeholder="yourname@email.com"/>
            <input type='password' placeholder="password"/>
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