'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  isLoaded as isAuthLoaded,
  load as loadAuth
} from '../redux/modules/auth';
import { About, Docs, Home, MembersOnly } from '../components';
import { Layout, Login } from '../containers';
import { NotFound } from '../shared';

const getRoutes = (store) => {
  const getAuth = (nextState, replace, next) => {
    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth())
      .then(() => next());
    } else {
      next();
    }
  }

  const requireLogin = (nextState, replace, next) => {
    function checkAuth () {
      const { auth: { user } } = store.getState();
      if (!user) {
        replace('/');
      }
      next();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  }

  const requireNoUser = (nextState, replace, next) => {
    function checkAuth () {
      const { auth: { user } } = store.getState();
      if (user) {
        replace('/membersOnly');
      }
      next();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth)
    } else {
      checkAuth();
    }
  }

  return (
    <Route path='/' onEnter={getAuth} component={Layout}>

      { /* Home route */ }
      <IndexRoute component={Home} />

      { /* Authenticated Routes */ }
      <Route onEnter={requireLogin}>
        <Route path='membersOnly' component={MembersOnly} />
      </Route>

      { /* Unauthenticated Routes Only */ }
      <Route onEnter={requireNoUser}>
        <Route path='login' component={Login} />
      </Route>

      { /* Routes */ }
      <Route path='about' component={About} />
      <Route path='docs' component={Docs} />

      { /* Catch all routes */ }
      <Route path='*' component={NotFound} />
    </Route>
  )
}

export default getRoutes;
