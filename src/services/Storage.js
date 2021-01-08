/**
 * Storage
 */
export class Storage {
  /**
   * @param {Object} ticker
   * @return {Array}
   */
  watchListAdd(ticker) {
    const watchList = this.watchListGet()
    watchList.push(ticker)
    this.watchListSet(watchList)

    return watchList
  }

  /**
   * @param {String} ticker
   * @return {Array}
   */
  watchListRemove(ticker) {
    const watchList = this.watchListGet()

    const newWatchList = watchList.filter((item) => item.ticker !== ticker)

    this.watchListSet(newWatchList)

    return watchList
  }

  /**
   * @return {Array}
   */
  watchListGet() {
    return JSON.parse(localStorage.getItem('BW_WATCHLIST')) || []
  }

  /**
   * @param {Array} payload
   * @return {Array}
   */
  watchListSet(payload) {
    localStorage.setItem(
        'BW_WATCHLIST',
        JSON.stringify(payload),
    )
    return payload
  }

  /**
   * @return {Boolean}
   */
  watchListVisibleGet() {
    return JSON.parse(localStorage.getItem('BW_WATCHLIST_VISIBLE')) ?
    true : false
  }

  /**
   * @param {Boolean} payload
   * @return {Boolean}
   */
  watchListVisibleSet(payload) {
    localStorage.setItem(
        'BW_WATCHLIST_VISIBLE',
        JSON.stringify(payload),
    )
    return payload
  }

  /**
   * @param {String} ticker
   * @return {String}
   */
  klineSelectedSet(ticker) {
    localStorage.setItem(
        'BW_KLINE_SELECTED',
        ticker,
    )
    return ticker
  }

  /**
   * @return {String}
   */
  klineSelectedGet() {
    return localStorage.getItem('BW_KLINE_SELECTED')
  }

  /**
   * @param {String} interval
   * @return {String}
   */
  intervalSelectedSet(interval) {
    localStorage.setItem(
        'BW_INTERVAL_SELECTED',
        interval,
    )
    return interval
  }

  /**
   * @return {String}
   */
  intervalSelectedGet() {
    return localStorage.getItem('BW_INTERVAL_SELECTED')
  }
}
