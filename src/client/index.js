import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, match, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { trigger } from 'redial';

import configureStore from '../common/store/configureStore';

// 初始状态
const initialState = window.INITIAL_STATE || {};
const store = configureStore(initialState);
const { dispatch } = store;

// 路由
const createRoutes = require('../common/routes').default;
const routes = createRoutes(store);

browserHistory.listen(location => {
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const { components } = renderProps;

    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,
      dispatch,
    };

    if (window.INITIAL_STATE) {
      delete window.INITIAL_STATE;
    } else {
      // 预加载数据
      trigger('fetch', components, locals);
    }

    // 客户端特有的数据加载
    trigger('defer', components, locals);
  });
});

ReactDOM.render((
  <Provider store={store}>
    <Router
      routes={routes}
      history={syncHistoryWithStore(browserHistory, store)}
    />
  </Provider>
), document.getElementById('app'));
