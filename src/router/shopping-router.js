const ShoppingController = require('../controllers/shopping-controller');
const UserAuth = require('../middlewares/auth-middleware');

const router = require('express').Router();

router.get('/', UserAuth, ShoppingController.GetOrders);
router.post('/create', UserAuth, ShoppingController.CreateNewOrder);

module.exports = router;
