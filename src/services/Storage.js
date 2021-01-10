/**
 * Storage
 */
export class Storage {
  /**
   */
  constructor() {
    this.init()
  }

  /**
   */
  init() {
    const localData = this.get()

    if (!localData) {
      this.set({
        watchlistVisible: true,
        watchlist: [],
        chart: {
          ticker: 'btcusdt',
          interval: '1h',
        },
      })
    }
  }

  /**
   * @return {Object}
   */
  get() {
    return JSON.parse(localStorage.getItem('BINANCE_WATCHER'))
  }

  /**
   * @param {Object} payload
   */
  set(payload) {
    localStorage.setItem(
        'BINANCE_WATCHER',
        JSON.stringify(payload),
    )
  }

  /**
   * @param {Object} ticker
   * @return {Object}
   */
  watchlistAdd(ticker) {
    const localData = this.get()
    localData.watchlist.push(ticker)
    this.set(localData)

    return localData
  }

  /**
   * @param {String} ticker
   * @return {Object}
   */
  watchlistRemove(ticker) {
    const localData = this.get()

    localData.watchlist = localData.watchlist
        .filter((item) => item.ticker !== ticker)

    this.set(localData)

    return localData
  }

  /**
   * @param {Boolean} visibled
   * @return {Object}
   */
  watchlistVisibleSet(visibled) {
    const localData = this.get()

    localData.watchlistVisible = visibled

    this.set(localData)

    return localData
  }

  /**
   * @param {String} ticker
   * @return {Object}
   */
  chartTickerSet(ticker) {
    const localData = this.get()

    localData.chart.ticker = ticker

    this.set(localData)

    return localData
  }

  /**
   * @param {String} interval
   * @return {Object}
   */
  chartIntervalSet(interval) {
    const localData = this.get()

    localData.chart.interval = interval

    this.set(localData)

    return localData
  }
}
