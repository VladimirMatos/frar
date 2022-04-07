import { getCart,addToCart } from "../controllers/cart.controller";
import express=require('express');

const cartRouter:express.Router=express.Router();


cartRouter.get('/getCart/:cliente_id',getCart)
cartRouter.post('/addToCart',addToCart)


export default cartRouter;