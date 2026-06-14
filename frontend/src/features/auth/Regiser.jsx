import React, { useEffect, useState } from 'react'
import Appbar from '../../components/Appbar'
import Inputfield from '../../components/Inputfield'
import CustomButton from '../../components/CustomButton'
import { reguser } from '../../services/AuthService'
import { toast } from "react-toastify";
import {useDispatch, useSelector} from 'react-redux'
import { authstate } from './authSlice'
import { useNavigate } from 'react-router-dom'
import { register_userthunk } from './authThunk'


const Register = () => {

  const [data,SetData] = useState({
    username:"",
    email:"",
    password:""
  })
  
  const dispach = useDispatch();
  const navigate = useNavigate();

  const authsate = useSelector(authstate)



  useEffect(() => {
  console.log("Auth State Changed:", authsate);
}, [authsate]);


  const handlechange = (e) =>{
     SetData({
      ...data,
      [e.target.name]:e.target.value,
     })
  }


const registeruser =  async() => {

  const result = await dispach(register_userthunk(data));


  if (register_userthunk.fulfilled.match(result)) {
    toast.success(result.payload.message);
    SetData({
    username:"",
    email:"",
    password:""
    })
    navigate('/login')
  }

  if (register_userthunk.rejected.match(result)) {
    toast.error(result.payload);
    SetData({
    username:"",
    email:"",
    password:""
    })
    
    console.log(result)

  }


};


  return (
    <div className='bg-gray-300'>
      
  <Appbar title="Login" />

  <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
    <form
      className="w-full max-w-md bg-white  rounded-lg shadow-md p-6"
      onSubmit={registeruser}
    >
      <h1 className="text-2xl font-bold text-center mb-6">
        Register Form
      </h1>

      <div className="flex flex-col">
            <Inputfield inputTitle={'Username'} value={data.username} name="username" type={'text'}  onchange={handlechange}/>
            <Inputfield inputTitle={'Email'} name="email" value={data.email} type={'email'} onchange={handlechange}/>
            <Inputfield inputTitle={'Password'} name="password" value={data.password} type={'password'} onchange={handlechange}/>
      </div>
        <CustomButton btntitle={'Register'} handleclick={registeruser}/>
    </form>
  </div>
</div>
  )
}

export default Register