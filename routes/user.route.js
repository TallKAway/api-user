const { Router } = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const UserController = require("../controllers/UserController");
const route = Router();

route.get("/user", isAuthenticated, UserController.FetchUser);
// route.post("/user/add", UserController.AddUser);
route.put("/user/update/:id",isAuthenticated, UserController.UpdateUser);
route.delete("/user/delete/:id",isAuthenticated, UserController.DeleteUser);
route.get("/get/with/:email",isAuthenticated, UserController.getUserByEmail);
route.put("/user/add/friend/",isAuthenticated, UserController.UpdateFriends);
route.delete("/user/delete/friend/:id",isAuthenticated, UserController.DeleteFriend);
// route.get("/user/:id", isAuthenticated, UserController.GetUserById);
route.get("/user/current/:id", isAuthenticated, UserController.CurrentUser);

module.exports = route;
