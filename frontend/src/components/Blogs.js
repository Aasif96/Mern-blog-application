import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blog from './Blog';

const Blogs = () => {
  const[blogs,setBlogs] = useState();
  const sendRequest = async () =>{
    try {
      const res = await axios.get('http://localhost:5000/api/blog')
      const data = await res.data;
      setBlogs(data.blogs)
      //console.log(data.blogs)
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
    isUser = {localStorage.getItem("userId") === blog.user} 
    key={index} 
    title={blog.title} 
    description={blog.description} 
    image={blog.image} 
    user={blog.user.name}
    />)}
    </>
  )
}

export default Blogs