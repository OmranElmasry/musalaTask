/** @format */

import { applyMiddleware, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'
import Reducers from './reducers'
import logger from './middleware/logger'
import { composeWithDevTools } from 'redux-devtools-extension'

const middlewares = __DEV__ ? [ReduxThunk, logger] : [ReduxThunk]

const store = createStore(Reducers, composeWithDevTools(applyMiddleware(...middlewares)))

export default store
