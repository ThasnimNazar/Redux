import asyncHandler from 'express-async-handler'
import Admin from '../Models/adminModel.js';
import generateAdminToken from '../utils/genearteadminToken.js';
import User from '../Models/userModel.js'
import { fetchAllUsers, updatedUser, deleteUser } from '../utils/Helpers/Adminhelper.js';
import destroyAdminToken from '../utils/destroytoken.js';

const registerAdmin = asyncHandler(async(req,res)=>{

    const { name, email, password, adminRegistrationKey } = req.body;

    if ( !email || !password ) {

        // If email or password is empty, return error

        res.status(401);

        throw new Error('Email or Password is missing in the request, Admin registration failed.');

    }
    if ( !adminRegistrationKey ) {

        // If adminRegistrationKey is empty, return error

        res.status(401);

        throw new Error('No Admin Registration Access Code, Admin registration aborted.');

    }else{

        // Check if Admin registration key is valid
        if(process.env.ADMIN_REGISTRATION_KEY !== adminRegistrationKey){

            res.status(401);

            throw new Error('Invalid Admin Registration Access Code, Admin registration failed.');

        }

    }

    const userExists = await Admin.findOne({ email })
    if(userExists)
    {
     res.status(400)
     throw new Error('user already exists')
    }

    const user = await Admin.create({
      name,email,password
    })

    if(user)
    {
        generateAdminToken(res,user._id)
        const registeredUserData = {
            _id : user._id,
            name: user.name,
            email: user.email,
        }

        res.status(201).json(registeredUserData);
    }
    else {

        // If user was NOT Created, send error back

        res.status(400);

        throw new Error('Invalid user data, User registration failed.');
    
    }

})

const authAdmin = asyncHandler ( async (req, res) => {

    /*
     # Desc: Auth user/set token
     # Route: POST /api/admin/auth
     # Access: PUBLIC
    */

    const { email, password } = req.body;

    if ( !email || !password ) {

        // If email or password is empty, return error

        res.status(401);

        throw new Error('Email or Password is missing in the request, Admin authentication failed.');

    }

    // Find the user in Db with the email and password
    const admin = await Admin.findOne({ email: email});

    let passwordValid = false;
    
    if (admin) {

        passwordValid = await admin.matchedPassword(password);

    }

    if ( passwordValid ) {

        // If user is created, send response back with jwt token

        generateAdminToken(res, admin._id); // Middleware to Generate token and send it back in response object

        const registeredAdminData = {
            name: admin.name,
            email: admin.email
        }

        res.status(201).json(registeredAdminData);

    } 
    
    if( !admin || !passwordValid ) {

        // If user or user password is not valid, send error back

        res.status(401);

        throw new Error('Invalid Email or Password, Admin authentication failed.');
    
    }

});

const getAllUsers = asyncHandler(async (req, res) => {

    const usersData = await fetchAllUsers();

    if(usersData){

        res.status(200).json({ usersData });

    }else{

        res.status(404);

        throw new Error("Users data fetch failed.");

    }

});

const updateUser = asyncHandler( async (req, res) => {

    const userId = req.body.userId;
    const name = req.body.name;
    const email = req.body.email;

    if(!userId){

        res.status(404);;

        throw new Error("UserId not received in request. User update failed.");

    }

    const userData = {userId: userId, name: name, email: email};

    const usersUpdateStatus = await updatedUser(userData);

    if(usersUpdateStatus.success){

        const response = usersUpdateStatus.message;

        res.status(200).json({ message:response });

    }else{

        res.status(404);

        throw new Error("User update failed.");

    }

});

const deleteUserData = asyncHandler( async (req, res) => {

    const userId = req.body.userId;

    const usersDeleteStatus = await deleteUser(userId);

    if(usersDeleteStatus.success){

        const response = usersDeleteStatus.message;

        res.status(200).json({ message:response });

    }else{

        res.status(404);

        const response = usersDeleteStatus.message;

        throw new Error(response);

    }

});

const getAdminProfile = asyncHandler ( async (req, res) => {

    /*
     # Desc: Get user profile
     # Route: GET /api/admin/profile
     # Access: PRIVATE
    */

    const user = {

        name: req.user.name,
        email: req.user.email

    }

    res.status(200).json({user});

});

const updateAdminProfile = asyncHandler ( async (req, res) => {

    /*
     # Desc: Update user profile
     # Route: PUT /api/admin/profile
     # Access: PRIVATE
    */

    // Find the user data with user id in the request object
    const admin = await Admin.findById(req.user._id);
    console.log(admin,'ad')

    if (admin) {
    
        // Update the user with new data if found or keep the old data itself.
        admin.name = req.body.name || admin.name;
        console.log(req.body.name,'nn')
        admin.email = req.body.email || admin.email;
        console.log(req.body.email)

        // If request has new password, update the user with the new password
        if (req.body.password) {

            admin.password = req.body.password
        
        }

        const updatedAdminData = await admin.save();
        console.log(updatedAdminData,'cc')

        // Send the response with updated user data
        res.status(200).json({

            name: updatedAdminData.name,
            email: updatedAdminData.email

        });

    } else {

        res.status(404);

        throw new Error("Requested Admin not found.");

    };

});

const logoutAdmin = asyncHandler ( async (req, res) => {

    /*
     # Desc: Logout user / clear cookie
     # Route: POST /api/admin/logout
     # Access: PUBLIC
    */

    destroyAdminToken(res);

    res.status(200).json({message: 'Admin Logged Out'});

});


const addUser =  asyncHandler( async (req, res) => {

    console.log(req.body)
    const { name, email, password } = req.body;

     // Check if user already exist
     const userExists = await User.findOne({ email });

     // If the user already exists, throw an error
     if (userExists) {
 
         res.status(400);
         
         throw new Error('User already exists');
 
     }
 
     // Store the user data to DB if the user dosen't exist already.
     const user = await User.create({
         name: name,
         email: email,
         password: password
     });
   
     if (user) {

     


        const registeredUserData = {
            name: user.name,
            email: user.email
        }

        res.status(201).json(registeredUserData);

    }else {

        // If user was NOT Created, send error back

        res.status(400);

        throw new Error('Invalid user data, User registration failed.');
    
    }
})



export{
    registerAdmin,
    authAdmin,
    getAllUsers,
    updateUser,
    deleteUserData,
    getAdminProfile,
    updateAdminProfile,
    logoutAdmin,
    addUser
}