import UserModel from "../models/User.js";
import bcrypt from "bcryptjs"

const getAllUser = async (req,res,next)=>{
    let users;
    try {
        users = await UserModel.find();
    } catch (error) {
        console.log(error)
    }
    if(!users){
        return res.status(404).json({message:'No users found'})
    }else{
        return res.status(200).json({users:users})
    }
}

const signup = async (req,res,next) =>{
    const {name,email,password} = req.body;
        let existingUser;
    try {
        existingUser = await UserModel.findOne({email:email});
    } catch (error) {
        console.log(error)
    }

    if(existingUser){
        return res.status(400).json({message:'user already exist'});
    }else{
        const hashedPassword = bcrypt.hashSync(password);
        const user = new UserModel({
            name,
            email,
            password:hashedPassword,
            blogs:[]   //blogs will have empty array as it is required in model
        })

        try {
            await user.save();
        } catch (error) {
            console.log(error)
        }
        return res.status(201).json({user})
    }
}

const login = async (req,res,next) =>{
    const {email,password} = req.body;
    let existingUser;
    try {
        existingUser = await UserModel.findOne({email:email});
    } catch (error) {
        console.log(error)
    }

    if(!existingUser){
        return res.status(400).json({message:'Couldnt find user'});
    }else{
        const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:'Incorrect username or password'})
        }else{
            return res.status(200).json({user:existingUser});
        }
    }

}

export default {getAllUser,signup,login}