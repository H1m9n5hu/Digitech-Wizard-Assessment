import express from 'express';
import { loginValidation, signUpValidation } from '../Middlewares/AuthValidation.js';
import { Login, SignUp } from '../Controllers/AuthController.js';

const router = express.Router();

router.post('/login', loginValidation, Login);
router.post('/signup', signUpValidation, SignUp);

export { router as AuthRouter };