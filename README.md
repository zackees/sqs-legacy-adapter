# sqs-legacy-adapter

`sqs-legacy-adapter` is a wrapper for the AWS SQS API using the `@aws-sdk/client-sqs` package. It provides a simplified interface for common SQS operations, making it easier to interact with AWS SQS.

## Installation

To install the package, use npm:

```sh
npm install sqs-legacy-adapter
```

## Usage

Here's a basic example of how to use the `sqs-legacy-adapter`:

```javascript
const SQSAdapter = require('sqs-legacy-adapter');

(async () => {
    const sqsAdapter = new SQSAdapter('us-east-1');
    
    // Create a new queue
    const queueUrl = await sqsAdapter.createQueue('MyTestQueue');
    console.log('Queue created:', queueUrl);

    // List queues
    const queues = await sqsAdapter.listQueues();
    console.log('Queues:', queues);

    // Send a message
    const messageId = await sqsAdapter.sendMessage(queueUrl, 'Hello, world!');
    console.log('Message sent:', messageId);

    // Receive a message
    const messages = await sqsAdapter.receiveMessage(queueUrl);
    console.log('Messages received:', messages);

    // Delete a message
    if (messages.length > 0) {
        const receiptHandle = messages[0].ReceiptHandle;
        await sqsAdapter.deleteMessage(queueUrl, receiptHandle);
        console.log('Message deleted');
    }

    // Delete the queue
    await sqsAdapter.deleteQueue(queueUrl);
    console.log('Queue deleted');
})();
```

## API

The `SQSAdapter` class provides the following methods:

- `listQueues()`: Lists all queues in your AWS account. Returns a promise that resolves to an array of queue URLs.
- `createQueue(queueName)`: Creates a new SQS queue with the specified name. Returns a promise that resolves to the URL of the created queue.
- `sendMessage(queueUrl, messageBody)`: Sends a message to the specified queue. Returns a promise that resolves to the ID of the sent message.
- `receiveMessage(queueUrl)`: Receives messages from the specified queue. Returns a promise that resolves to an array of messages.
- `deleteMessage(queueUrl, receiptHandle)`: Deletes a message from the specified queue. Returns a promise that resolves when the message is deleted.
- `deleteQueue(queueUrl)`: Deletes the specified queue. Returns a promise that resolves when the queue is deleted.

## License

This project is licensed under the ISC License.
