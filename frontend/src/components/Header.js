import React, {useState} from 'react'
import {AppBar, Toolbar, Typography, Button, Tabs, Tab } from '@mui/material'
import { Box } from '@mui/system'
import { Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {authActions} from '../store/index.js' 

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState(0)
  return (
    <AppBar position='sticky'>
      <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
        <Typography variant='h4'>BlogApp</Typography>
        {isLoggedIn && <Box display='flex'>
        <Tabs textColor='inherit' value={value} onChange={(e,val)=>setValue(val)}>
          <Tab LinkComponent={Link} to='/blogs' label='All Blogs'/>
          <Tab LinkComponent={Link} to='/myblogs' label='My Blogs'/>
          <Tab LinkComponent={Link} to='/blogs/add' label='Add Blogs'/>
        </Tabs>
        </Box>}
        <Box>
          {!isLoggedIn && <>
          <Button LinkComponent={Link} to="/auth" variant='contained' sx={{margin:1, borderRadius:10}} color='warning'>Login</Button>
          <Button LinkComponent={Link} to="/auth" variant='contained' sx={{margin:1, borderRadius:10}} color='warning'>Sign up</Button>
          </>}
          {isLoggedIn && 
          <Button 
          onClick={()=>dispatch(authActions.logout())}
          LinkComponent={Link} to="/auth" variant='contained' sx={{margin:1, borderRadius:10}} color='warning'>Logout</Button>}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header

