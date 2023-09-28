import { Application } from 'express'

import userRouter from "./user-router"
import productRouter from "./product-router"

const createRoutesV1 = (app: Application): void => {

  app.use("/api/v1/users", userRouter) // la cadena es el path, es decir lo comun que tiene todas las rutas
  app.use("/api/v1/products", productRouter)
};

export default createRoutesV1;
