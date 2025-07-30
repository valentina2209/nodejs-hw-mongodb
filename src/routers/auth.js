import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema, resetPasswordSchema, sendResetEmailSchema } from '../validation/auth.js';
import { loginUserController,
         logoutUserController,
         registerUserController,
         refreshUsersSessionController,
         sendResetEmailController,
         resetPasswordController} from '../controllers/auth.controller.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post(
  '/logout',
  ctrlWrapper(logoutUserController),
);

router.post(
  '/refresh',
  ctrlWrapper(refreshUsersSessionController),
);

router.post(
  '/send-reset-email',
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmailController),
);

router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;
