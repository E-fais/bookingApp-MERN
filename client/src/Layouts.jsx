import { Outlet } from "react-router-dom"
import Header from "./comoponents/Header"


function Layouts() {
  return (
    <div className="p-4 flex flex-col min-h-screen">
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Layouts