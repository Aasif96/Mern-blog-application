import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {authActions} from '../store/index.js'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[inputs,setInputs] = useState({
    name:'',
    email:'',
    password:''
  })
  const[isSignup,setIsSignup] = useState(false)

  const handleChange = (e) =>{
      let name = e.target.name;
      let value = e.target.value;
      setInputs(values => ({...values, [name]: value}))
  }

  const sendRequest = async (type='login') =>{
    try {
      const res = await axios.post(`http://localhost:5000/api/user/${type}`,{
      name:inputs.name,
      email:inputs.email,
      password:inputs.password
    })
    const data = await res.data;
    return data;
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) =>{
      e.preventDefault();
      if(isSignup){
       
        (async () => {
          try {
          const res_status = await sendRequest('signup')
          console.log(res_status.user._id)
          await localStorage.setItem("userId",res_status.user._id)
          await dispatch(authActions.login());
          await navigate('/blogs')
          } catch (error) {
            console.log(error)
          }
        })();
       

      }else{
        sendRequest()
        .then((data)=>localStorage.setItem("userId",data.user._id))
        .then(()=>dispatch(authActions.login()))
        .then(()=>navigate('/blogs'))  // we have two methods here then method or above async method
      }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <Box 
      maxWidth={400}
      display='flex' 
      flexDirection='column' 
      alignItems='center' 
      justifyContent='center'
      boxShadow='10px 10px 20px #ccc'
      padding={3}
      margin='auto'
      marginTop={5}
      borderRadius={5}
      >
      <Typography variant='h2' padding={3} textAlign='center'>{isSignup ? 'Signup': 'Login'}</Typography>
      {isSignup && <TextField placeholder='name' name="name" value={inputs.name} onChange={handleChange} type='text' margin='normal'/>}
      <TextField placeholder='email' name='email' value={inputs.email} onChange={handleChange} type='email' margin='normal'/>
      <TextField placeholder='password' name='password' value={inputs.password} onChange={handleChange} type='password' margin='normal'/>
      <Button
      type='submit'
      variant='contained' 
      sx={{borderRadius:3, marginTop:3}}
       color='warning'>
        Submit
      </Button>
      <Button onClick={()=>{setIsSignup(!isSignup)}}
      variant='outlined'
       sx={{borderRadius:3, 
       marginTop:3}}>{isSignup ? 'Login':'Sign up'}</Button>
      </Box>
    </form>
    </>
  )
}

export default Auth
