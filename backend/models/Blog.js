import mongoose, { mongo } from "mongoose";

const blogSchema = {
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",  //provide reference of collection name....Each blog will contain one single user and each user can have multiple blogs
        required:true
    }
}

const BlogModel = mongoose.model('Blog',blogSchema);
export default BlogModel