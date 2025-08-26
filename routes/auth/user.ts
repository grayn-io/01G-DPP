import { Router } from 'express';

import controller from '../../controllers/auth';
import { graynFormConvertion, verifyAuthStatus } from '../../util/request';

const router = Router();

router.get('/email/verify', verifyAuthStatus, controller.getEmailVerification);
router.post('/email/verify', controller.verifyEmail);
router.post('/email/verify/token', controller.resendVerifyEmail);
router.post('/password/reset', graynFormConvertion, controller.resetPassword);
router.post('/password/reset/token', graynFormConvertion, controller.sendResetPassword);

export default router;
