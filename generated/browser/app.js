'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import getRoutes from './config/routes';
import configureStore from './redux/configureStore';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const component = (
  <Router history={history} routes={getRoutes(store)} />
);

render(
  <Provider store={store} key='provider'>
    {component}
  </Provider>,
  document.getElementById('app')
);
