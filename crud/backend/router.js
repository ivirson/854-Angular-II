const { Router } = require('express');
const productsRouter = require('./modules/products/routes/products.routes');
const usersRouter = require('./modules/users/routes/users.routes');

const router = Router();

router.use('/users', usersRouter)
router.use('/products', productsRouter)

module.exports = router;