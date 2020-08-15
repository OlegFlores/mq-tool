

module.exports = async function subscribeToExchange(channel, {
  exchangeName,
  exchangeType,
  queueName,
  messageTtl,
  routingKey,
  autoAck = false
}, handleEvent) {

  await channel.assertExchange(exchangeName, exchangeType, {durable: true});
  const queue = (await channel.assertQueue(queueName, {exclusive: false, messageTtl})).queue;
  await channel.bindQueue(queue, exchangeName, routingKey);
  return channel.consume(queue, async (msg) => {
    if (msg !== null) {
      try {
        const newEvent = JSON.parse(msg.content.toString());
        console.debug(`New message received in queue '${queue}'`, newEvent);
        return await handleEvent(newEvent, () => {
          channel.ack(msg);
        });
      } catch(ex) {
        console.error(ex);
      }
      if (autoAck) {
        channel.ack(msg);
      }

    }
  }).catch(console.warn);
};

