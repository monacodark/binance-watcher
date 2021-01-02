export { default as Chart } from '../../components/Chart.vue'
export { default as WatchItem } from '../../components/WatchItem.vue'
export { default as WatchList } from '../../components/WatchList.vue'
export { default as WatchListAdd } from '../../components/WatchListAdd.vue'
export { default as WatchListAddItem } from '../../components/WatchListAddItem.vue'

export const LazyChart = import('../../components/Chart.vue' /* webpackChunkName: "components/Chart" */).then(c => c.default || c)
export const LazyWatchItem = import('../../components/WatchItem.vue' /* webpackChunkName: "components/WatchItem" */).then(c => c.default || c)
export const LazyWatchList = import('../../components/WatchList.vue' /* webpackChunkName: "components/WatchList" */).then(c => c.default || c)
export const LazyWatchListAdd = import('../../components/WatchListAdd.vue' /* webpackChunkName: "components/WatchListAdd" */).then(c => c.default || c)
export const LazyWatchListAddItem = import('../../components/WatchListAddItem.vue' /* webpackChunkName: "components/WatchListAddItem" */).then(c => c.default || c)
