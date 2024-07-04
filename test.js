// test.js
const SQSAdapter = require('./index');

async function test() {
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
}

test().catch(console.error);
