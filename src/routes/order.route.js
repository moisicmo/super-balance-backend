const { Router } = require('express');
const { validarJWT } = require('./../middlewares');
const {
  getOrders,
  getOrdersSold,
  getDocument,
  createOrder,
  updateOrder,
  updateOrderSold,
  deleteOrder,
} = require('../controllers');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);


// Obtener orders
router.get('/', getOrders);
router.get('/sold', getOrdersSold);
router.put('/sold/:id', updateOrderSold);
router.get('/document/:id', getDocument)

router.post(
  '/',
  createOrder
);
router.put(
  '/:id',
  updateOrder
)
router.delete(
  '/:id',
  deleteOrder
)


module.exports = router;