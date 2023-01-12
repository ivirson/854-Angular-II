const express = require('express');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const router = require('./router');

const app = express();

app.use(express.json());
app.use(router);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(5000, () => console.log('Server running on port 5000'));