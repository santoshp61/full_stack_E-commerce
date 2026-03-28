// backend/routes/userRoute.js
import express from 'express'
import { loginUser, registerUser, adminLogin, getUserProfile } from '../controllers/userController.js';
import authUser from '../middleware/auth.js'; // Ensure this middleware exists

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);

// ADD THIS LINE
userRouter.post('/get-profile', authUser, getUserProfile);

export default userRouter;