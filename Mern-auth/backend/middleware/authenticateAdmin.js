import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Admin from '../Models/adminModel.js';


const authenticateAdmin = asyncHandler( async (req, res, next) => {
    console.log('error')

    const tokenFromRequest = req.cookies.adminJwt;
    if (tokenFromRequest) {
    console.log('ii')
        try {
            
            // Decode the jwt token using the secret key in the server
            const decodedTokenData = jwt.verify( tokenFromRequest, process.env.JWT_SECRET_KEY_ADMIN);
            console.log(decodedTokenData,'jj')

            // If the Token is valid, search the Db with the userId obtained after decoding jwt payload
            const requestUser = await Admin.findById(decodedTokenData.userId).select('-password');

            if (requestUser) {
            
                req.user = requestUser; // Set the request user with the user data fetched from the Db

                next(); // Proceed to next process

            }

        } catch (error) {
            
            res.status(401);

            throw new Error(`Authentication Failed. Invalid token found`);

        }

    } else {

        res.status(401);

        throw new Error(`Authentication Failed. No token found`);

    }

});


export default authenticateAdmin;

