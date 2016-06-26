import _ from 'lodash';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, createMemoryHistory, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import helmet from 'react-helmet';
import { trigger } from 'redial';

import createRoutes from '../../common/routes';
import configureStore from '../../common/store/configureStore';

const renderPage = (content, assets, initialState) => {
  const head = helmet.rewind();

  return `
    <!DOCTYPE html>
    <html>
      <head>
        ${head.meta.toString()}
        ${head.title.toString()}
        ${head.link.toString()}
        <link rel="stylesheet" type="text/css" href="${assets.styles.app}">
      </head>
      <body>
        <div id="app">${content}</div>
        <script>window.INITIAL_STATE = ${JSON.stringify(initialState)};</script>
        <script src="${assets.javascript.vendor}"></script>
        <script src="${assets.javascript.app}"></script>
      </body>
    </html>
  `;
};

const page = (getAssets, req, res, next) => {
  const store = configureStore();
  const { dispatch, getState } = store;
  const routes = createRoutes(store);
  const history = createMemoryHistory(req.path);

  match({ routes, history }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }

    if (!renderProps) {
      res.status(404).send('Not found');
      return;
    }

    const { components } = renderProps;

    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,
      dispatch,
    };

    trigger('fetch', components, locals)
      .then(() => {
        const initialState = store.getState();

        const InitialView = (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );

        return res
          .status(200)
          .send(
            renderPage(renderToString(InitialView), getAssets(), initialState)
          );
      })
      .catch(err => next(err));
  });
};

export default (getAssets) => _.partial(page, getAssets);
