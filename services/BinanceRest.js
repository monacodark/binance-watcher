import {_HttpClient} from './_HttpClient'
/**
 * https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md
 */
export class BinanceRest extends _HttpClient {
  /**
   * construnctor
   */
  constructor() {
    super({
      baseURL: 'https://api.binance.com/api',
    })
  }

  /**
   * @return {object}
   */
  async getExchangeInfo() {
    return await this._sendRequest('GET', 'v3/exchangeInfo')
  }

  /**
   * @param {object} params
   * @return {object}
   */
  async getKlines(params) {
    const intervals = [
      '1m', '3m', '5m', '15m', '30m',
      '1h', '2h', '4h', '6h', '8h', '12h',
      '1d', '3d', '1w', '1M',
    ]

    const invalidInterval = (
      !params.interval ||
      intervals.indexOf(params.interval < 0)
    )

    if (invalidInterval) {
      return {
        success: false,
        code: 'invalid_interval',
      }
    }

    return await this._sendRequest('GET', 'v3/klines', params)
  }
}
