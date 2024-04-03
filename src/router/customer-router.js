const router = require('express').Router();
const CustomerController = require('../controllers/customer-controller');
const UserAuth = require('../middlewares/auth-middleware');

router.post('/signup', CustomerController.SignUp);
router.post('/signin', CustomerController.SignIn);

router.get('/profile', UserAuth, CustomerController.Profile);

module.exports = router;
