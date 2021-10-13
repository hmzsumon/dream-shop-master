const express = require('express');
const {
	registerUser,
	loginUser,
	logout,
	forgetPassword,
	resetPassword,
	getUserDetails,
	updatePassword,
	updateProfile,
	getAllUsers,
	getAllSingleUser,
	updateUserRol,
	deleteUser,
} = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgetPassword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/logout').get(logout);

router.route('/me').get(isAuthenticatedUser, getUserDetails);

// Update Password route
router.route('/password/update').put(isAuthenticatedUser, updatePassword);

// Update Profile route
router.route('/me/update').put(isAuthenticatedUser, updateProfile);

// Get All Users For Admin
router
	.route('/admin/users')
	.get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);

// Get Single User For Admin
router
	.route('/admin/user/:id')
	.get(isAuthenticatedUser, authorizeRoles('admin'), getAllSingleUser)
	.put(isAuthenticatedUser, authorizeRoles('admin'), updateUserRol)
	.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

module.exports = router;
