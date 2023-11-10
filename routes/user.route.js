const { Router } = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const UserController = require("../controllers/UserController");
const route = Router();

route.get("/user", isAuthenticated, UserController.FetchUser);
// route.post("/user/add", UserController.AddUser);
route.put("/user/update/:id", UserController.UpdateUser);
route.delete("/user/delete/:id", UserController.DeleteUser);
route.get("/get/with/:email", UserController.getUserByEmail);
route.put("/user/add/friend/:id", UserController.UpdateFriends);
route.delete("/user/delete/friend/:id", UserController.DeleteFriend);

module.exports = route;
