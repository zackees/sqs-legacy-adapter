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

function convertLegacyParams(options) {
    const clientParams = {};
    if (options.endpoint) {
        clientParams.endpoint = options.endpoint.toString();
    }
    if (options.region) {
        clientParams.region = options.region;
    }
    if (options.accessKeyId !== undefined || options.secretAccessKey !== undefined) {
        clientParams.credentials = {};
        if (options.accessKeyId !== undefined) {
            clientParams.credentials.accessKeyId = options.accessKeyId;
        }
        if (options.secretAccessKey !== undefined) {
            clientParams.credentials.secretAccessKey = options.secretAccessKey;
        }
    }
    return clientParams;
}

SQSAdapter.SQS = class {
    constructor(options = {}) {
        const clientParams = convertLegacyParams(options);
        this.client = new SQSClient(clientParams);
    }

    listQueues(options = {}) {
        return {
            promise: async () => {
                const params = {};
                if (options.QueueNamePrefix) {
                    params.QueueNamePrefix = options.QueueNamePrefix;
                }
                const command = new ListQueuesCommand(params);
                const response = await this.client.send(command);
                return { QueueUrls: response.QueueUrls || [] };
            }
        };
    }

    createQueue(options = {}) {
        return {
            promise: async () => {
                const command = new CreateQueueCommand(options);
                const response = await this.client.send(command);
                return { QueueUrl: response.QueueUrl };
            }
        };
    }

    sendMessage(options = {}) {
        return {
            promise: async () => {
                const command = new SendMessageCommand(options);
                const response = await this.client.send(command);
                return { MessageId: response.MessageId };
            }
        };
    }

    receiveMessage(options = {}) {
        return {
            promise: async () => {
                const command = new ReceiveMessageCommand(options);
                const response = await this.client.send(command);
                return { Messages: response.Messages };
            }
        };
    }

    deleteMessage(options = {}) {
        return {
            promise: async () => {
                const command = new DeleteMessageCommand(options);
                return await this.client.send(command);
            }
        };
    }

    deleteQueue(options = {}) {
        return {
            promise: async () => {
                const command = new DeleteQueueCommand(options);
                return await this.client.send(command);
            }
        };
    }
};

module.exports = {
    default: SQSAdapter
};
