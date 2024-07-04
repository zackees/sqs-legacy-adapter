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
const AWS = require('sqs-legacy-adapter');
const dotenv = require('dotenv');

dotenv.config();

async function runSqsTest() {
    const sqs = new AWS.SQS({
        apiVersion: '2012-11-05',
        region: 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        endpoint: new AWS.Endpoint('http://localhost'),
    });

    const queueName = 'my-test-queue';
    const [queueUrl, queueCreated] = await createOrGetQueue(sqs, queueName);

    await sqs.sendMessage({ QueueUrl: queueUrl, MessageBody: 'hello world' }).promise();
    
    const receiveResponse = await sqs.receiveMessage({ QueueUrl: queueUrl, MaxNumberOfMessages: 1 }).promise();
    if (receiveResponse.Messages && receiveResponse.Messages.length > 0) {
        const message = receiveResponse.Messages[0];
        await sqs.deleteMessage({ QueueUrl: queueUrl, ReceiptHandle: message.ReceiptHandle }).promise();
    }

    await sqs.deleteQueue({ QueueUrl: queueUrl }).promise();
}

runSqsTest().catch(console.error);
```

## Environment Variables

The following environment variables are required:

- `AWS_ACCESS_KEY_ID`: Your AWS access key ID
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key

## API

The `AWS.SQS` class provides the following methods:

- `listQueues(params)`: Lists queues. Returns a promise that resolves to an object containing QueueUrls.
- `createQueue(params)`: Creates a new SQS queue. Returns a promise that resolves to an object containing the QueueUrl.
- `sendMessage(params)`: Sends a message to a specified queue. Returns a promise that resolves to an object containing the MessageId.
- `receiveMessage(params)`: Receives messages from a specified queue. Returns a promise that resolves to an object containing Messages.
- `deleteMessage(params)`: Deletes a specified message from a specified queue. Returns a promise that resolves when the message is deleted.
- `deleteQueue(params)`: Deletes the specified queue. Returns a promise that resolves when the queue is deleted.

All methods return objects with a `promise()` method for use with async/await.

## License

This project is licensed under the ISC License.
