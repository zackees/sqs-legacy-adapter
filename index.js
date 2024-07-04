// index.js
const { SQSClient, ListQueuesCommand, CreateQueueCommand, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand, DeleteQueueCommand } = require('@aws-sdk/client-sqs');

class SQSAdapter {
}

SQSAdapter.Endpoint = class {
    constructor(endpointUrl) {
        this.endpointUrl = endpointUrl;
    }

    toString() {
        return this.endpointUrl;
    }
};

SQSAdapter.SQS = class {
    constructor(region, options = {}) {
        const clientParams = {
            region,
            ...options
        };

        if (options.endpoint) {
            clientParams.endpoint = options.endpoint;
        }

        this.client = new SQSClient(clientParams);
    }

    async listQueues() {
        const command = new ListQueuesCommand({});
        const response = await this.client.send(command);
        return response.QueueUrls;
    }

    async createQueue(queueName) {
        const params = {
            QueueName: queueName,
        };
        const command = new CreateQueueCommand(params);
        const response = await this.client.send(command);
        return response.QueueUrl;
    }

    async sendMessage(queueUrl, messageBody) {
        const params = {
            QueueUrl: queueUrl,
            MessageBody: messageBody,
        };
        const command = new SendMessageCommand(params);
        const response = await this.client.send(command);
        return response.MessageId;
    }

    async receiveMessage(queueUrl) {
        const params = {
            QueueUrl: queueUrl,
            MaxNumberOfMessages: 1,
        };
        const command = new ReceiveMessageCommand(params);
        const response = await this.client.send(command);
        return response.Messages;
    }

    async deleteMessage(queueUrl, receiptHandle) {
        const params = {
            QueueUrl: queueUrl,
            ReceiptHandle: receiptHandle,
        };
        const command = new DeleteMessageCommand(params);
        const response = await this.client.send(command);
        return response;
    }

    async deleteQueue(queueUrl) {
        const params = {
            QueueUrl: queueUrl,
        };
        const command = new DeleteQueueCommand(params);
        const response = await this.client.send(command);
        return response;
    }
};

module.exports = {
    default: SQSAdapter
};
