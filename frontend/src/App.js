import './App.css';
import {Routes, Route} from "react-router-dom";
import Header from './components/Header';
import Auth from './components/Auth';
import Blogs from './components/Blogs'
import BlogDetail from './components/BlogDetail';
import UserBlogs from './components/UserBlogs';
import AddBlog from './components/AddBlog';
import { useDispatch, useSelector } from 'react-redux';  
import { authActions } from './store';
import { useEffect } from 'react';

function App() {     
  const dispatch = useDispatch();
  
  //to grab state from redux we have hook in react-redux
  const isLoggedIn = useSelector((state) => state.isLoggedIn);      //it has callback function inside it...grab the property
  console.log(isLoggedIn)
  useEffect(() => {
    if(localStorage.getItem("userId")){
      dispatch(authActions.login())
    }

  }, [dispatch])
  
  return (                               
    <>
    <Header/>
    <Routes>
      {!isLoggedIn ? <Route path='/auth' element={<Auth/>}/> :
      <>
      <Route path='/blogs' element={<Blogs/>}/>
      <Route path='/myblogs' element={<UserBlogs/>}/>
      <Route path='/myblogs/:id' element={<BlogDetail/>}/>
      <Route path='/blogs/add' element={<AddBlog/>}/>
      </>}
    </Routes>
    </>
  );
}

export default App;
