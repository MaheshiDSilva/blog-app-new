const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const fs=require("fs")
const path=require("path")
const {v4:uuid}=require("uuid")

const User = require("../models/userModel")
const HttpError=require("../models/errorModels")


// ----------------register a new user------------------
//POST: api/users/register
const registerUser = async (req, res, next) => {
    try {
        const {name, email, password, password2} = req.body;
        if (!name || !email || !password) {
            return next(new HttpError("Fill in all fields", 422))
        }

        const newEmail = email.toLowerCase()

        const emailExists = await User.findOne({email: newEmail})
        if (emailExists) {
            return next(new HttpError("Email already exists", 422))
        }

        if ((password.trim()).length<6){
            return next(new HttpError("Password should be at least 6 characters.",422))
        }

        if (password !=password2){
            return next(new HttpError("Password do not match.",422))
        }

        const salt= await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(password,salt)
        const newUser=await User.create({name,email:newEmail,password:hashPassword})
        res.status(201).json(`New user ${newUser.email} registered.`)

    } catch (error) {
        return next(new HttpError("User registration failed", 422))
    }
}



// ----------------login a registered user------------------
//POST: api/users/login
const loginUser = async (req, res, next) => {
    try{
        const {email,password}=req.body;
        if (!email || !password){
            return next(new HttpError("Fill in all fields.",422))
        }
        const newEmail=email.toLowerCase();

        const user=await User.findOne({email:newEmail});
        if (!user){
            return next(new HttpError("Invalid credentials",422))
        }
        const comparePass=await bcrypt.compare(password,user.password)

        if (!comparePass){
            return next(new HttpError("Invalid credentials",422))
        }

        const {id:id,name}=user;
        const token=jwt.sign({id,name},process.env.JWT_SECRET,{expiresIn: "id"})
        res.status("200").json({token,id,name})

    }catch (error) {
        return next(new HttpError("Login failed. Please check your credentials.",422))
    }
    
}



// ----------------user profile------------------
//POST: api/users/:id
const getUser = async (req, res, next) => {
    try{
        const {id}=req.params;
        const user=await User.findById(id).select('-password')
        if (!user){
            return next(new HttpError("User not found.",404))
        }
        res.status(200).json(user);

    }catch (error) {
        return next(new HttpError(error))
    }
}



// ----------------change user avatar(profile picture)------------------
//POST: api/users/change-avatar
const changeAvatar = async (req, res, next) => {
    try{
       if (!req.files.avatar){
           return next(new HttpError("Please choose an image.",422))
       }

       //find user from database
        const user=await User.findById(req.user.id);

       //delete old avatar if exists
        if (user.avatar){
            fs.unlink(path.join(__dirname,"..","uploads",user.avatar),(err)=>{
                if (err){
                    return next(new HttpError(err))
                }
            })
        }

        const {avatar}=req.files;
        //check file size
        if (avatar.size>500000){
            return next(new HttpError("Profile picture too big. Should be less than 500kb"),422)
        }

        let fileName;
        fileName=avatar.name;
        let splittedFileName=fileName.split(".")
        let newFileName=splittedFileName[0] + uuid() + "." + splittedFileName[splittedFileName.length-1]
        avatar.move(path.join(__dirname,"..","uploads",newFileName),async (err)=>{
            if (err){
                return next(new HttpError(err))
            }
            const updatedAvatar= await User.findByIdAndUpdate(req.user.id,{avatar:newFileName},{new:true})
            if (!updatedAvatar){
                return next(new HttpError("Avatar couldn't be changed.",422))
            }
            res.status(200).json(updatedAvatar)
        })

    }catch (error) {
        return next(new HttpError(error))
    }
}




// ----------------edit user details(from profile)------------------
//POST: api/users/edit-user
const editUser = async (req, res, next) => {
    res.json("Edit user details")
}



// ----------------get authors------------------
//POST: api/users/authors
const getAuthors = async (req, res, next) => {
    try{
        const authors=await User.find().select("-password");
        res.json(authors);
    }catch (error) {
        return next(new HttpError(error))
    }
}


module.exports = {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors}