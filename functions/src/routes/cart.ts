import { getCart,addToCart, deleteAllCart, deleteCart } from "../controllers/cart.controller";
import express=require('express');

const cartRouter:express.Router=express.Router();


cartRouter.get('/getCart/:cliente_id',getCart)
cartRouter.post('/addToCart',addToCart)
cartRouter.delete('/deleteAllCart/:cliente_id',deleteAllCart)
cartRouter.delete('/deleteCart/:id',deleteCart)


export default cartRouter;