import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blog = (title,key) => {

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`${title.id}`)
  }

  const deleteRequest = async () =>{
    const res = await axios.delete(`http://localhost:5000/api/blog/${title.id}`).catch((err) => console.log(err))
  }

  const handleDelete = () =>{
    deleteRequest().then(()=>navigate('/myblogs'))
  }

  return (
    <>
     <Card key={key} sx={{ width:"40%", margin:"auto", mt:2, p:2, boxShadow:"5px 5px 10px #ccc", ":hover":{boxShadow:"10px 10px 10px #ccc"}}}>
      {title.isUser && (<Box display={'flex'} justifyContent={'end'} >
        <IconButton onClick={handleEdit}><EditIcon/></IconButton>
        <IconButton onClick={handleDelete}><DeleteIcon/></IconButton>
        </Box>)}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
         title={title.title}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={title.image}
        alt={title.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {title.description}
        </Typography>
      </CardContent>
    </Card>
    </>
  )
}

export default Blog