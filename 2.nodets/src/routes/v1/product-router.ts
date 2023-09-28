import { Router } from "express"
import * as productsController from '../../controllers/v1/products-controller'
import { checkAuth } from "../../middlewares/auth-middlewares";

const router = Router()

router.get('', checkAuth, productsController.getProducts);
router.get('/:productId', checkAuth, productsController.getProductById);
router.post('/create', checkAuth, productsController.createProduct);
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