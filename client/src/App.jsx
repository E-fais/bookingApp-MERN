import IndexPage from "./pages/IndexPage";
import {Route,Routes, useParams} from 'react-router-dom'
import LoginPage from "./pages/LoginPage";
import Account from "./pages/Account";
import Layouts from "./Layouts";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./Context/UserContext";
import PlacesPage from "./pages/PlacesPage";
import FetchPalces from "./comoponents/FetchPalces";
import EditPlace from "./pages/EditPlace";
axios.defaults.baseURL="http://localhost:4000"
axios.defaults.withCredentials=true
function App() {
  const {id}=useParams()
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layouts/>}>
      <Route index element={<IndexPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/account/:subpage?" element={<Account/>}/>
      <Route path="/account/:subpage/:action" element={<Account/>}/>
      <Route path="/places/:id" element={<EditPlace/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
