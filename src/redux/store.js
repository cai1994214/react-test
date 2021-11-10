import { createStore, combineReducers } from 'redux'
import { CollApsedReducer } from './reducers/collapseReducer.js'
import { LoadingReducer } from './reducers/loadingReducer.js'
import { DemoReducer } from './reducers/demoReducer.js'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'kerwin',
    storage,
    blacklist: ['LoadingReducer']//黑名单 不需要持久化存储的 reducer
  }

const reducer = combineReducers({// 引入不同地方的reducers 可以用combineReducers统一处理
    CollApsedReducer,
    LoadingReducer,
    DemoReducer
})

const persistedReducer = persistReducer(persistConfig, reducer);//将isCollapsed持久化

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export {
    store,
    persistor
}