import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import event from "./events"
import participant from "./participants"

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['event']
}

const rootReducer = combineReducers({
  event,
  participant
})

export default persistReducer(persistConfig, rootReducer)