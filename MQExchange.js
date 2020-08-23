const {MQ} = require('../consts');

/**
 * @class MQExchange
 * @property {string} name
 * @property {string} type
 * @property {string} defaultRoutingKey
 * @property {boolean} durable
 * @type {ExchangeHostCommands}
 */
module.exports = class MQExchange {

  /**
   *
   * @param {string} name
   * @param {string} type
   * @param {string} defaultRoutingKey
   * @param {boolean} durable
   */
  constructor(name, type, defaultRoutingKey, durable) {
    this.name = name;
    this.type = type;
    this.defaultRoutingKey = defaultRoutingKey;
    this.durable = durable;
  }
}