import { Router } from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const authRoutes = Router();

authRoutes.route('/register').post(
  registerUser,
);

authRoutes.route('/login').post(loginUser);

//secured routes
authRoutes.route('/logout').post(verifyJWT, logoutUser);
authRoutes.route('/refresh-token').post(refreshAccessToken);
authRoutes.route('/change-password').post(verifyJWT, changeCurrentPassword);
authRoutes.route('/current-user').get(verifyJWT, getCurrentUser);
authRoutes.route('/update-account').patch(verifyJWT, updateAccountDetails);

export {authRoutes};
