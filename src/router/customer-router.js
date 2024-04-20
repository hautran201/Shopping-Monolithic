const router = require('express').Router();
const CustomerController = require('../controllers/customer-controller');
const UserAuth = require('../middlewares/auth-middleware');

router.get('/profile', UserAuth, CustomerController.Profile);
router.get('/shopping-details', UserAuth, CustomerController.GetShoppingDetail);
router.get('/wishlist', UserAuth, CustomerController.GetWishlist);
router.get('/cart', UserAuth, CustomerController.GetCart);

router.post('/signup', CustomerController.SignUp);
router.post('/signin', CustomerController.SignIn);
router.post('/address', UserAuth, CustomerController.AddAddress);

router.put('/wishlist', UserAuth, CustomerController.AddWishlist);
router.put('/cart', UserAuth, CustomerController.AddItemToCart);
router.delete('/cart/:id', UserAuth, CustomerController.RemoveItemToCart);

module.exports = router;
