import express=require('express');
const almacenamientoRouter:express.Router=express.Router();
import * as linkController from "../controllers/link.controller";

almacenamientoRouter.get('/getLinks',linkController.getLinks);
almacenamientoRouter.get('/getLinkById/:filter',linkController.getLinksByParams);

export default almacenamientoRouter;