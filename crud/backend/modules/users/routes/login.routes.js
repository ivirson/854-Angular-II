const { Router } = require("express");
const loginController = require("../controllers/login.controller");

const loginRouter = Router();

loginRouter.get("/", loginController.login);

module.exports = loginRouter;
