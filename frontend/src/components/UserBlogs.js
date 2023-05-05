import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Blog from './Blog';

const UserBlogs = () => {
  const [blogs,setBlogs] = useState();  //by default it will be an empty array
  const id = localStorage.getItem("userId");

  const sendRequest = async () =>{
    try {
      const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`)
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error)
    }
}

  useEffect(()=>{
    sendRequest().then(data => setBlogs(data.blogs))
  },[])
  return (
    <>
    {/* when ever there will be blogs then all will be render, condition is put below */}
    {blogs && blogs.map((blog,index) => <Blog
    id={blog._id}
    isUser = {true} 
    key={index} 
    title={blog.title} 
    description={blog.description} 
    image={blog.image} 
    user={blog.user.name}/>)}
    </>
  )
}

export default UserBlogs