import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import eventReducer from './eventReducer';

const store = createStore(eventReducer, compose(applyMiddleware(thunk)))

export default store