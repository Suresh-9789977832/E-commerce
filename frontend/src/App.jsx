import Login from "./features/auth/Login"
import {Routes,Route, Navigate, useNavigate} from 'react-router-dom'
import Register from "./features/auth/Regiser"
import Home from "./pages/Home"
import cart from "./pages/cart"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { get_profilethunk } from "./features/auth/authThunk";
import Cart from "./pages/cart"


function App() {

    const [user,setuser] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

useEffect(() => {
  const token = localStorage.getItem("Token");

  if (!token) {
    setuser(null);
    return;
  }

  if (!token || user) return;

  const get_profile = async () => {
    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      const profileData = await dispatch(
        get_profilethunk({ userId, token })
      );

      if (get_profilethunk.fulfilled.match(profileData)) {
        setuser(profileData.payload.user);
      } else {
        setuser(null);
        localStorage.removeItem("Token");
      }
    } catch {
      setuser(null);
      localStorage.removeItem("Token");
    }
  };

  get_profile();
}, []);



  return (
    <>
      <div className="main_container">
             <ToastContainer />
    <Routes>
      <Route path="/register" element={user ? <Navigate to="/" /> : <Register />}/>
      <Route path="/login" element={ user ? ( <Navigate to="/" /> ) : (<Login user={user} setuser={setuser} />)}/>
      <Route path="/" element={ user ? ( <Home user={user} setuser={setuser} /> ) : ( <Navigate to="/login" />)}/>
       <Route path="/cart" element={ user ? ( <Cart user={user} setuser={setuser} /> ) : ( <Navigate to="/login" />)}/>
    </Routes>
      </div>
    </>
  )
}

export default App
  