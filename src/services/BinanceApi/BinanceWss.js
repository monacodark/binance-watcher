import Vue from 'vue'

/**
 * https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md
 */
export class BinanceWss {
  /**
   * construnctor
   */
  constructor() {
    this._actionId = 0
  }

  /**
   * @param {String} method
   * @param {Array} params
   * @return {Number}
   */
  _send(method, params) {
    Vue.prototype.$socket.send(
        JSON.stringify({
          method,
          params,
          id: this._actionId,
        }),
    )

    return ++this._actionId
  }

  /**
   * @param {Array} params
   * @return {Number}
   */
  subscribe(params) {
    return this._send('SUBSCRIBE', params)
  }

  /**
   * @param {Array} params
   * @return {Number}
   */
  unsubscribe(params) {
    return this._send('UNSUBSCRIBE', params)
  }
}
