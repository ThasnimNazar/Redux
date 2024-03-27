import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../Models/userModel.js'


//access public
//desc auth token
 const authUser = asyncHandler(async(req,res) =>{
    console.log(req.body,'pp')
const { email,password } = req.body;
const user = await User.findOne({email})
console.log(user)
if (user && (await user.matchedPassword(password)))
    {
        console.log('aa')
        generateToken(res,user._id)
        res.json({
            _id : user._id,
            name : user.name,
            email : user.email
        })
    }else{
        res.status(400);
        throw new Error('Invalid email or password');
    }
})

//desc register a new User
//access public
 const registerUser = asyncHandler(async(req,res) =>{
    const{ name,email,password } = req.body;
    const userExists = await User.findOne({email})
    if(userExists)
        {
            res.status(400)
            throw new Error('User already exists')  
        }
    const user = await User.create({
        name,
        email,
        password
    })
    if(user)
    {
        generateToken(res,user._id)
        res.json({
            _id : user._id,
            name : user.name,
            email : user.email
        })
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
    res.status(200).json({message:'user registered successfully'})
  })

//desc logout a user
//public access
 const logoutUser = asyncHandler(async(req,res) =>{
    res.cookie('jwt','',{
        httpOnly : true,
        expires : new Date(0)
    })
    res.status(200).json({message : 'logout user'})
  }) 
  
//desc get user profile
//private access
const getuserProfile = asyncHandler(async(req,res) =>{
    const user = {
        _id : req.user._id,
        name : req.user.name,
        email : req.user.email

    }
    res.status(200).json(user)
  })



  const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    console.log(user,'oo')
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
  
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });

export{
    authUser,
    registerUser,
    logoutUser,
    getuserProfile,
    updateProfile



}