const amqp = require('amqplib');

class RabbitMQProducer {
    constructor(rabbitMQUrl, exchangeName, queueName, routingKeyName) {
        this.rabbitMQUrl = rabbitMQUrl;
        this.connection = null;
        this.channel = null;
        this.exchange = exchangeName;
        this.queue = queueName;
        this.routingKey = routingKeyName;
    }

    async connect() {
        this.connection = await amqp.connect(this.rabbitMQUrl);
        this.channel = await this.connection.createChannel();
    }

    async sendMessage(userId, socketEvent, payload) {
        if (!this.connection || !this.channel) {
            throw new Error('RabbitMQ connection not established.');
        }

        try {

            const data = {userId, socketEvent, payload};

            await this.channel.assertExchange(this.exchange, 'direct', {durable: true});
            await this.channel.assertQueue(this.queue, {durable: true});
            await this.channel.bindQueue(this.queue, this.exchange, this.routingKey);

            this.channel.publish(this.exchange, this.routingKey, Buffer.from(JSON.stringify(data)), {persistent: true});

            console.log('Message emitted:', data);

        } catch (error) {
            console.error('Error emitting message:', error);

        }


        // await this.channel.assertQueue(this.queueName, { durable: true });
        // await this.channel.sendToQueue(this.queueName, Buffer.from(message));
        // console.log('Message sent:', message);
    }

    async disconnect() {
        if (this.connection) {
            await this.connection.close();
            this.connection = null;
            this.channel = null;
        }
    }
}

// Singleton instance
const rabbitMQProducer = new RabbitMQProducer(
    'amqp://localhost',
    'exchangeChat',
    'queueChat',
    'routingKetChat');

// API FORMATION INSTANCE
// const rabbitMQProducerApiFormation = new RabbitMQProducer(
//     'amqp://localhost',
//     'memberExchange',
//     'memberQueue',
//     'memberRoutingKey'); // Update with your RabbitMQ server URL

module.exports = {
    rabbitMQProducer
    // rabbitMQProducerApiFormation
};