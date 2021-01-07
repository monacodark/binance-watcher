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
  async tickerListGet() {
    const {
      success,
      data,
      message,
    } = await this.rest.getExchangeInfo()

    if (!success) return {success, message}

    const tickerList = data.symbols
        .map(
            (ticker) => {
              const isTrading = ticker.status === 'TRADING'
              if (isTrading) return {ticker: ticker.symbol.toLowerCase()}
              else return false
            },
        )
        .filter((ticker) => ticker)

    return {success, tickerList}
  }

  /**
   * @param {Array} watchList
   */
  watchListSubscribe(watchList) {
    const params = watchList.map((item) => `${item.ticker}@aggTrade`)
    this.wss.subscribe(params)
  }

  /**
   * @param {Array} watchList
   */
  watchListUnsubscribe(watchList) {
    const params = watchList.map((item) => `${item.ticker}@aggTrade`)
    this.wss.unsubscribe(params)
  }

  /**
   * @param {String} ticker
   */
  watchListAdd(ticker) {
    this.wss.subscribe([`${ticker}@aggTrade`])
  }

  /**
   * @param {String} ticker
   */
  watchListRemove(ticker) {
    this.wss.unsubscribe([`${ticker}@aggTrade`])
  }

  /**
   * @param {String} ticker
   */
  klineSelect(ticker) {

  }

  /**
   * @param {Object} params
   */
  async klineGet(params) {
    return await this.rest.getKlines(params)
  }
}
