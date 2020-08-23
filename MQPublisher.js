/**
 * @typedef MQLogger
 * @property {Function} log
 * @property {Function} error
 */

/**
 * @class MQPublisher
 * @property publish
 */
module.exports = class MQPublisher {

  /**
   *
   * @param {string} channel
   * @param {MQEchange} exchange
   * @param {MQLogger} logger
   */
  constructor(channel, exchange, logger = null) {
    this.channel = channel;
    this.exchangeName = exchange.name;
    this.defaultRoutingKey = exchange.defaultRoutingKey;
    this.logger = logger;
  }

  /**
   *
   * @param dataToPublish {object}
   * @param dataToPublish.selfValidate {Function}
   * @param routingKey {string}
   * @returns {Promise<*>}
   */
  async publish(dataToPublish, routingKey= null) {
    try {
      const routingKeyToUse = routingKey || this.defaultRoutingKey;
      dataToPublish.selfValidate();
      return this.channel.publish(this.exchangeName, routingKeyToUse, Buffer.from(JSON.stringify(dataToPublish)));
    } catch(ex) {
      if(this.logger) {
        this.logger.error('Could not send dataToPublish:', dataToPublish);
        this.logger.error(ex);
      } else {
        console.error('Could not send dataToPublish:', dataToPublish);
        console.error(ex);
      }
    }
  }

}