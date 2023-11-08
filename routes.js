const userRouter = require("./routes/user.route");

module.exports = (app) => {
  app.use("/", userRouter);
};
