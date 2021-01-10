import {BinanceRest} from './BinanceRest'
import {BinanceWss} from './BinanceWss'

/**
 * BinanceApi
 */
export class BinanceApi {
  /**
   * construnctor
   */
  constructor() {
    this.rest = new BinanceRest()
    this.wss = new BinanceWss()
  }

  /**
   */
  async tickersGet() {
    const {
      success,
      data,
      message,
    } = await this.rest.getExchangeInfo()

    if (!success) return {success, message}

    const tickers = data.symbols
        .map(
            (item) => {
              const isTrading = item.status === 'TRADING'
              if (isTrading) return {ticker: item.symbol.toLowerCase()}
              else return false
            },
        )
        .filter((item) => item)

    return {success, tickers}
  }

  /**
   * @param {Array} watchlist
   * @return {Number}
   */
  watchlistSubscribe(watchlist) {
    const params = watchlist.map((item) => `${item.ticker}@aggTrade`)
    return this.wss.subscribe(params)
  }

  /**
   * @param {Array} watchlist
   * @return {Number}
   */
  watchlistUnsubscribe(watchlist) {
    const params = watchlist.map((item) => `${item.ticker}@aggTrade`)
    return this.wss.unsubscribe(params)
  }

  /**
   * @param {String} ticker
   */
  watchlistAdd(ticker) {
    this.wss.subscribe([`${ticker}@aggTrade`])
  }

  /**
   * @param {String} ticker
   */
  watchlistRemove(ticker) {
    this.wss.unsubscribe([`${ticker}@aggTrade`])
  }

  /**
   * @param {String} ticker
   * @param {String} interval
   */
  klineUnsubscribe(ticker, interval) {
    this.wss.unsubscribe([`${ticker}@kline_${interval}`])
  }

  /**
   * @param {String} ticker
   * @param {String} interval
   */
  klineSubscribe(ticker, interval) {
    this.wss.subscribe([`${ticker}@kline_${interval}`])
  }

  /**
   * @param {Object} params
   */
  async klineGet(params) {
    const response = await this.rest.getKlines(params)

    const {success, data: kline} = response

    if (!success) return response

    const resultKline = kline.map((item) => {
      return [
        item[0],
        Number(item[1]),
        Number(item[2]),
        Number(item[3]),
        Number(item[4]),
        Number(item[5]),
      ]
    })

    return {success, data: resultKline}
  }
}
