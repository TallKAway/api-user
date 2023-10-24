const { Router } = require("express");
const { isAuthenticated } = require('../middlewares/auth');
const UserController= require('../controllers/UserController');
const route = Router();

route.get('/users', UserController.FetchUser);
route.post('/user/add', UserController.AddUser);
route.put('/user/update/:id', UserController.UpdateUser);
route.delete('/user/delete/:id', UserController.DeleteUser);


module.exports = route;