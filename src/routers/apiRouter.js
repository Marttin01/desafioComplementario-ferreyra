import { Router } from "express";
import { cartsRouter } from "./cartsRouter.js";
import { messagesRouter } from "./messagesRouter.js";
import { productsRouter } from "./productsRouter.js";

export const apiRouter = Router()
apiRouter.use('/carts', cartsRouter)
apiRouter.use('/messages', messagesRouter)
apiRouter.use('/products', productsRouter)