import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';

import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, apiMiddleware),
      __DEVTOOLS__ && window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
}
