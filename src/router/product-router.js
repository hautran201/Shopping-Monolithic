const productController = require('../controllers/product-controller');
const UserAuth = require('../middlewares/auth-middleware');

const router = require('express').Router();

router.get('/', productController.GetAllProducts);
router.get('/:id', productController.GetProduct);
router.get('/category/:type', productController.GetProductByCategory);

router.post('/create', productController.CreateProduct);
// router.push('/update', productController.UpdateProduct);

module.exports = router;
