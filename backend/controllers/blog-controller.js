import mongoose from 'mongoose';
import BlogModel from '../models/Blog.js';
import UserModel from '../models/User.js';

const getAllBlogs = async (req,res) =>{
    let blogs;
    try {
        blogs = await BlogModel.find().populate('user');
    } catch (error) {
        console.log(error)
    }

    if(!blogs){
        return res.status(404).json({message:'No users found'})
     }else{
        return res.status(200).json({blogs})
     }
}


const addBlog = async (req,res) =>{
    const {title,description,image,user} = req.body;
    let existingUser;
    try {
        existingUser = await UserModel.findById(user);
    } catch (error) {
        console.log(error)
    }
    if(!existingUser){
        return res.status(400).json({message:"unable to find user by this id"})
    }
    const blog = new BlogModel({
        title,
        description,
        image,
        user
    })
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});    ///we have to save only by this session only
        existingUser.blogs.push(blog);     //blogs is the filed name in user collection in model
        await existingUser.save({session})   // save only by this session only
        await session.commitTransaction();
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:err})
    }
    return res.status(201).json({blog})
}

const updateBlog = async (req,res) =>{
    const {title,description} = req.body;
    const blogId = req.params.id;
    let blog;
    try {
     blog = await BlogModel.findByIdAndUpdate(blogId,{
        title,
        description
    });
    } catch (error) {
        return console.log(error)
    }
    if(!blog){
        return res.status(500).json({message:"Unable to update blog"})
    }else{
        return res.status(200).json(blog)
    }

}

const getById = async (req,res) =>{
    const id = req.params.id;
    let blog;
    try {
        blog = await BlogModel.findById(id)
    } catch (error) {
        console.log(error)
    }
    if(!blog){
        return res.status(404).json({message: "no blog found"})
    }else{
        return res.status(200).json(blog)
    }
}


const deleteBlog = async (req,res) =>{
    const id = req.params.id;
    let blogId;
    try {
        blogId = await BlogModel.findByIdAndRemove(id).populate('user')   //populate refers to user collection and will get the whole document
        await blogId.user.blogs.pull(blogId)    //pull method in mongodb will remove the blogid from user collection field name blogs
        await blogId.user.save();
    } catch (error) {
        console.log(error)
    }

    if(!blogId){
        return res.status(500).json({message: "unable to delete"})
    }else{
        return res.status(200).json({message:"successfully deleted"})
    }
}


const getByUserId = async (req,res) =>{
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await UserModel.findById(userId).populate('blogs')
    } catch (error) {
        console.log(error)
    }

    if(!userBlogs){
        return res.status(400).json({message:"No blog found"})
    }else{
        return res.status(200).json(userBlogs)
        console.log(userBlogs)
    }
}

export default {getAllBlogs,addBlog,updateBlog,getById,deleteBlog,getByUserId};
