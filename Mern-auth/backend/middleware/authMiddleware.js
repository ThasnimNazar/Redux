import jwt from 'jsonwebtoken' //have to get the userId from the token
import asyncHandler from 'express-async-handler'
import User from '../Models/userModel.js'
import { Error } from 'mongoose';

const protect = asyncHandler(async(req,res,next)=>{
    let token;
    token = req.cookies.jwt
    if(token)
    {
    try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decoded.userId).select('-password')
    console.log(req.user,'mm')
    next()
    }
    catch(error)
    {
        res.status(401)
        throw new Error('not authorized','Invalid token')
    }
    }
    else{
        res.status(401)
        throw new Error('unauthorized user','no token')
    }
})

export{ protect }