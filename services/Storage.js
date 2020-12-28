/**
 * Storage
 */
export class Storage {
  /**
   * @param {Object} payload
   * @return {Array}
   */
  watchListAdd(payload) {
    const watchList = this.watchListGet()
    watchList.push(payload)
    this.watchListSet(watchList)

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
}
