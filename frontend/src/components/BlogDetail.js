import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { InputLabel, TextField, Typography, Button, Grid } from '@mui/material'
import { Box } from '@mui/system'

const BlogDetail = () => {
  const[blogs,setBlogs] = useState();

  const id = useParams().id;

    const[inputs,setInputs] = useState({
      title:'',
      description:'',
      imageURL:''
    })
  
    const handleChange = (e) =>{
      let name = e.target.name;
      let value = e.target.value;
  
      setInputs(values => ({...values,[name]:value}))
    }

    const sendRequest = async () =>{
      const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
        title:inputs.title,
        description:inputs.description,
        image : inputs.imageURL,
        user:localStorage.getItem("userId")
      }).catch(err => console.log(err))
  
      const data = await res.data;
      return data;
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
      sendRequest().then((data) => console.log(data))
    }


  const fetchDetails = async () =>{
    const res = await axios.get(`http://localhost:5000/api/blog/${id}`)
    .catch(err=>console.log(err))
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    fetchDetails().then((data) =>{
      setBlogs(data)
      setInputs({
        title:data.title,
        description:data.description,
        imageURL:data.image
      })
    })
  },[id])
  

  return (
    <>
    <form onSubmit={handleSubmit}>
      <Box border={3} 
           borderColor="green"
           borderRadius={10} 
           boxShadow="10px 10px 20px #ccc" 
           padding={3} 
           margin={'auto'}
           marginTop={5}
           display='flex'
           flexDirection={'column'}
           width='80%'>
        <Typography display={'flex'} justifyContent='center' fontWeight={10} variant='h3'>Post your Blog</Typography>
        <InputLabel  >Title</InputLabel>
        <TextField  placeholder='Add Title' name='title' value={inputs.title} onChange={handleChange}/>
        <InputLabel sx={{marginBottom:'10px'}}>Description</InputLabel>
        <TextField  placeholder='Add Description' name='description' value={inputs.description} onChange={handleChange}/>
        <InputLabel sx={{marginBottom:'10px'}}>Image URL</InputLabel>
        <TextField placeholder='Add Imageurl' name='imageURL' value={inputs.imageURL} onChange={handleChange}/>
        
      <Grid container display="flex" justifyContent="center" >
  <Grid item>
  <Button
      type='submit'
      variant='contained'
      sx={{borderRadius:3, marginTop:3, width:'10rem' }}
       color='warning'>
        Submit
      </Button>
  </Grid>
</Grid>
      </Box>
    </form>
    </>
  )
}

export default BlogDetail