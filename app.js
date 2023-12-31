require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const createSocket = require("./socket/socketio");
const route = require("./routes");
const http = require("http");
const { rabbitMQProducer } = require("./amqp/producer");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require('./docs/swaggerConfig');

const PORT = process.env.PORT || 3007;
const api = express();
dotenv.config();
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(cors({
  origin: '*'
}));

api.use(express.static("public"));

const ads = [{ Message: `User api is running on Port: ${PORT}` }];

api.get("/", (req, res) => {
  res.send(ads);
});
api.get("/socket", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

api.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

route(api);

const server = http.createServer(api);
let io = createSocket(server);
global.io = io;

server
  .listen(PORT , async () => {
    console.info(`Listening on port ${PORT}`);
    try {
      await rabbitMQProducer.connect();
      // await rabbitMQProducerApiFormation.connect();
    } catch (error) {
      console.info(`Error while connecting amqp`);
    }
  })
  .setTimeout(50000);

module.exports = api;
