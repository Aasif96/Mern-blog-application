import mongoose from "mongoose";

const userSchema = {
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    blogs:[{type:mongoose.Types.ObjectId,ref:"Blog", required:true}] // user can have multiple blogs
}

//Model
const UserModel = mongoose.model("User",userSchema) //in mongodb it will be in plura forms...like users not user
export default UserModel;