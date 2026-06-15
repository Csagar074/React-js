const express = require('express');
const { registerUser, loginUser, forgotPassword, verifyOTP, newPassword, fetchAllUser, deleteUser, updateUser, activeOrInActiveUser, userProfile, changePassword, fetchSingleUser } = require('../../../controllers/auth/user/user.controller');
const { upload } = require('../../../middleware/storage.middleware');
const userRoute = express.Router();

userRoute.post('/register', upload.single('profile_image'), registerUser);
userRoute.post('/login', loginUser);
userRoute.post('/forgot-password', forgotPassword);
userRoute.post('/verify-otp', verifyOTP);
userRoute.post('/new-password', newPassword);

// localhost:8000/api/auth/user/register
// localhost:8000/api/auth/user/login

userRoute.get('/', fetchAllUser);
userRoute.get('/:id', fetchSingleUser);
userRoute.delete('/', deleteUser);
userRoute.patch('/', upload.single('profile_image'), updateUser);
userRoute.put('/', activeOrInActiveUser);

userRoute.get('/profile', userProfile);

userRoute.post('/change-password', changePassword);

module.exports = userRoute;