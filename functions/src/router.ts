import { Router } from 'express'
const router: Router = Router()

 import userRouter from "./routes/usuario";
 import authRouter from "./routes/auth";
 import productosRouter from "./routes/productos"
 import inventarioRouter from "./routes/inventario"
 import clienteRouter from "./routes/cliente"
 import inicializarRouter from "./routes/inicializar"
 import provedorRouter from "./routes/provedor"
 import almacenamientoRouter from "./routes/almacenamiento"
 import facturaRouter from './routes/facturas';
import cartRouter from './routes/cart';
import categoriaRouter from './routes/categoria';
import link from './routes/link';
// Routes
router.use('/categoria', categoriaRouter)
router.use('/cart',cartRouter)
router.use('/factura',facturaRouter)
router.use('/almacen',almacenamientoRouter)
router.use('/provedor',provedorRouter)
router.use('/inicializar',inicializarRouter)
router.use('/user',userRouter)
router.use('/auth',authRouter)
router.use('/producto',productosRouter)
router.use('/invetario',inventarioRouter)
router.use('/cliente',clienteRouter)
router.use('/link',link)


export default router;