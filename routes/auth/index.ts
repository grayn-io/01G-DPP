import { Router } from 'express';
import passport from 'passport';

import userRoutes from './user';

import controller from '../../controllers/auth';
import { graynFormConvertion, graynLoginConvertion, verifyAuthStatus } from '../../util/request';

const router = Router();

router.post('/delete', verifyAuthStatus, controller.deleteAccount);
router.post('/delete/confirm', verifyAuthStatus, controller.confirmDeleteAccount);
router.post('/password/change', verifyAuthStatus, controller.changePassword);
router.post('/session/refresh', verifyAuthStatus, controller.refreshSession);
router.post('/signin', graynLoginConvertion, controller.signIn);
router.post('/signout', verifyAuthStatus, controller.signOut);
router.post('/signup', graynFormConvertion, controller.signUp);
router.use('/user', userRoutes);

export default router;
