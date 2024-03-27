import express from 'express'
import { authAdmin, registerAdmin, getAllUsers, updateUser, deleteUserData,getAdminProfile, updateAdminProfile, logoutAdmin, addUser } from '../controllers/adminController.js'
import  authenticateAdmin  from '../middleware/authenticateAdmin.js'
import { multerUploadUserProfile } from '../../connection/multer.js'

const adminRouter = express.Router()

adminRouter.post('/' ,registerAdmin)
adminRouter.post('/auth',authAdmin)
adminRouter.post('/get-users', authenticateAdmin, getAllUsers);
adminRouter.put('/update-user',authenticateAdmin, updateUser);
adminRouter.post('/delete-user', authenticateAdmin, deleteUserData);
adminRouter.route('/profile').get( authenticateAdmin, getAdminProfile ).put( authenticateAdmin,multerUploadUserProfile.single('profileImage'), updateAdminProfile );
adminRouter.post('/logout', logoutAdmin);
adminRouter.post('/add-user',authenticateAdmin,addUser)

export default adminRouter