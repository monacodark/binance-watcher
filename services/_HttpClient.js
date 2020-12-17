import axios from 'axios'

/**
 * construnctor
 * https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md
 */
export class _HttpClient {
  /**
   * construnctor
   * @param {object} payload
   */
  constructor(payload) {
    this._httpClient = axios.create(payload)
  }

  /**
   * @param {string} url
   * @param {object} payload
   * @return {object}
   */
  async _GET(url, payload) {
    try {
      const {data} = await this._httpClient.get(url, payload)

      return {success: true, data}
    } catch (error) {
      return this._getError(error)
    }
  }

  /**
   * @param {string} method
   * @param {string} url
   * @param {object} params
   * @return {object}
   */
  async _sendRequest(method, url, params={}) {
    switch (method) {
      case 'GET':
        return await this._GET(url, {params})
      default:
        return {success: false, code: 'method_unknown'}
    }
  }

  /**
   * @param {object} error
   * @return {object}
   */
  _getError(error) {
    if (error.response) {
      return {
        success: false,
        response: error.response,
      }
    } else {
      return {
        success: false,
        status: 500,
        code: 'no_response',
        message: error.message,
      }
    }
  }
}
