import express=require('express');
const authRouter:express.Router=express.Router();
import * as loginController from "../controllers/auth.controller";

authRouter.post('/login',loginController.login);



export default authRouter;