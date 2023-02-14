import { applyMiddleware, compose, combineReducers, legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk';
import adsReducer from './adsReducer.js';
import userRuducer from './userReducer';
import requestReducer from './requestReducer';
import initialState from './initialState.js';

const reducer = combineReducers({
  ads: adsReducer,
  user: userRuducer,
  request: requestReducer 
});

const store = createStore(
  reducer, 
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;