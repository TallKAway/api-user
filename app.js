require('dotenv').config();

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const createSocket = require("./socket/socketio");
const route = require("./routes");
const http = require('http');
const { rabbitMQProducer } = require('./amqp/producer');

const PORT = process.env.PORT || 3007;
const api = express();
dotenv.config();
api.use(express.json());
api.use(cors());

api.use(express.static('public'));

const ads = [{ Message: `Chat api is running on Port: ${PORT}` }];

api.get('/', (req, res) => {
    res.send(ads);
});
api.get('/socket', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});





const server = http.createServer(api);
route(api);
let io = createSocket(server)
global.io = io;

server.listen(PORT, async () => {
    console.info(`Listening on port ${PORT}`);
    try {
            await rabbitMQProducer.connect();
            // await rabbitMQProducerApiFormation.connect();
    }
    catch (error) {
       console.info(`Error while connecting amqp`);
    }

}).setTimeout(50000);

module.exports = api;