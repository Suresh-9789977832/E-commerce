import React, { useEffect, useState } from 'react'
import Appbar from '../../components/Appbar'
import Inputfield from '../../components/Inputfield'
import CustomButton from '../../components/CustomButton'
import { login_userthunk } from './authThunk'
import {useDispatch, useSelector} from 'react-redux'
import { authstate } from './authSlice'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'


const Login = ({user,setuser}) => {



  const [data,setData] = useState({
    email:"",
    password:""
  })

  const dispach = useDispatch()
  const getuserstate = useSelector(authstate)
  const navigate = useNavigate();
  


  // useEffect(()=>{
  //     console.log('getuserstate',getuserstate)
  //     
  //     
  // },[getuserstate])
  




  const Loginuser = async() => {
    
      const response = await dispach(login_userthunk(data))
      
       if (login_userthunk.fulfilled.match(response)) {
            console.log('response',)
          toast.success(response.payload.message);
          setData({
          username:"",
          email:"",
          password:""
          })
          setuser(response?.payload?.user)
          localStorage.setItem('Token',response?.payload?.user?.Token)
          navigate('/')
        }
      
        if (login_userthunk.rejected.match(response)) {
          toast.error(response.payload);
          setData({
          username:"",
          email:"",
          password:""
          })
        }
  }


  const handlechange = (e) => {
    setData({
      ...data,
      [e.target.name]:e.target.value
    })
  }


  return (
    <div className='bg-gray-300'>
  <Appbar title="Register" />

  <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
    <form
      className="w-full max-w-md bg-white rounded-lg shadow-md p-6"
    >
      <h1 className="text-2xl font-bold text-center mb-6">
        Login Form
      </h1>

      <div className="flex flex-col">
            <Inputfield inputTitle={'Email'} onchange={handlechange} value={data.email} name={'email'} type={'text'}/>
            <Inputfield inputTitle={'Password'} onchange={handlechange} value={data.password} name={'password'} type={'password'}/>
      </div>

        <CustomButton  btntitle={'Login'}  handleclick={Loginuser}/>

    </form>
  </div>
</div>
  )
}

export default Login