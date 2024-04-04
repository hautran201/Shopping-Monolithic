const router = require('express').Router();
const CustomerController = require('../controllers/customer-controller');
const UserAuth = require('../middlewares/auth-middleware');

router.get('/profile', UserAuth, CustomerController.Profile);
router.get('/shopping-details', UserAuth, CustomerController.GetShoppingDetail);
router.get('/wishlist', UserAuth, CustomerController.GetWishlist);

router.post('/signup', CustomerController.SignUp);
router.post('/signin', CustomerController.SignIn);
router.post('/address', UserAuth, CustomerController.AddAddress);

module.exports = router;
