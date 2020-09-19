import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import { persistStore } from "redux-persist"
import rootReducer from './reducer'

const store = createStore(
  rootReducer,
  applyMiddleware(
    promiseMiddleware,
    logger
  )
)

const persistor = persistStore(store)

export default { store, persistor }