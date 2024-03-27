import express from 'express'
import {protect} from '../middleware/authMiddleware.js' 
import {authUser,registerUser,
    logoutUser,getuserProfile,updateProfile
} from '../controllers/userController.js'




const router = express.Router();

router.post('/',registerUser)
router.post('/auth',authUser)
router.post('/logout',logoutUser)
router.route('/profile').get(protect,getuserProfile).put(protect,updateProfile)


export default router;