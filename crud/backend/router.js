const { Router } = require('express');
const productsRouter = require('./routes/products.routes');
const usersRouter = require('./routes/users.routes');

const router = Router();

router.use('/users', usersRouter);
router.use('/products', productsRouter);

module.exports = router;