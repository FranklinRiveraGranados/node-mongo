import { Router } from "express"
import * as productsController from '../../controllers/v1/products-controller'
import { checkIp, checkAuth } from "../../middlewares/auth-middlewares";
import { validateNewProductBody } from "../../validators/products-validator";
import { handleRequestErrors } from "../../middlewares/validator-middleware";

const router = Router()

//podemos pasar varios middlewars antes de procesar la solicitud
//router.get('', checkIp, checkAuth, productsController.getProducts);
router.get('', checkAuth, productsController.getProducts);
router.get('/:productId', checkAuth, productsController.getProductById);
router.post(
  '/create', 
  checkAuth, 
  validateNewProductBody,
  handleRequestErrors,
  productsController.createProduct
);
router.put('/:productId', checkAuth, productsController.updateProduct);
router.patch(
  '/:productId', checkAuth,
  productsController.partialUpdateProduct
);
router.delete(
  '/:productId', checkAuth,
  productsController.deleteProductById
);
router.post(
  '/:productId/notify-client', checkAuth,
  productsController.updateProductAndNotify
);




export default router