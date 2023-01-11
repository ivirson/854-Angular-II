const { Router } = require('express');
const usersController = require('../controllers/users.controller');

const usersRouter = Router();

usersRouter.get('/', (req, res) => usersController.getUsers(req, res));
usersRouter.get('/:id', (req, res) => usersController.getUserById(req, res));
usersRouter.post('/', (req, res) => usersController.saveUser(req, res));
usersRouter.put('/:id', (req, res) => usersController.updateUser(req, res));
usersRouter.delete('/:id', (req, res) => usersController.deleteUser(req, res));

module.exports = usersRouter;