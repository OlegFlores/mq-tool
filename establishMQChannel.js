

module.exports = async function establishAMQPChannel(amqpURL) {
  try {
    const connection = await require('amqplib').connect(`amqp://${amqpURL}`);
    const channel = await connection.createChannel();
    return channel;
  } catch(ex) {
    console.error(ex);
    process.exit(1);
  }
}