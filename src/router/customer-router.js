const { AppError } = require('../utils/app-error');

const router = require('express').Router();

router.get('/', (req, res) => {
    // let { email } = req.body;
    try {
        res.json(a);
    } catch (error) {
        throw new AppError(error.message, 404);
    }
});

module.exports = router;
