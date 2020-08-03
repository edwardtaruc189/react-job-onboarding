import React from 'react';
import { Route } from 'react-router-dom';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
import LoadingSpinner from 'components/LoadingSpinner';
import { AUTH_PATH } from 'constants/paths';

const locationHelper = locationHelperBuilder({});
const history = createBrowserHistory();

history.listen((location, action) => {
  ReactGA.initialize('UA-54415203-8');
  ReactGA.pageview(window.location.pathname + window.location.search);
});

const AUTHED_REDIRECT = 'AUTHED_REDIRECT';
const UNAUTHED_REDIRECT = 'UNAUTHED_REDIRECT';
const INSUFFICIENT_PRIVILEGES = 'INSUFFICIENT_PRIVILEGES';

/**
 * Higher Order Component that redirects to `/login` instead
 * rendering if user is not authenticated (default of redux-auth-wrapper).
 */
export const UserIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  AuthenticatingComponent: LoadingSpinner,
  wrapperDisplayName: 'UserIsAuthenticated',
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: ({ firebase: { auth } }) =>
    !auth.isEmpty && Boolean(auth.uid),
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing,
  redirectAction: newLoc => dispatch => {
    // Use push, replace, and go to navigate around.
    history.push(newLoc);
    dispatch({
      type: UNAUTHED_REDIRECT,
      payload: { message: 'User is not authenticated.' }
    });
  }
});

export const UserIsAuthAndHasRole = (roles = [], redirectPath = '/') =>
  connectedRouterRedirect({
    redirectPath,
    AuthenticatingComponent: LoadingSpinner,
    wrapperDisplayName: 'UserIsAuthAndHasRole',
    authenticatedSelector: ({ firebase: { auth, profile } }) => {
      return (
        !auth.isEmpty &&
        auth.uid &&
        !profile.isEmpty &&
        roles.includes(profile.role)
      );
    },
    authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
      !auth.isLoaded || isInitializing,
    redirectAction: newLoc => dispatch => {
      history.push(newLoc);
      dispatch({
        type: INSUFFICIENT_PRIVILEGES,
        payload: { message: 'User does not have sufficient privileges' }
      });
    }
  });

/**
 * Higher Order Component that redirects to listings page or most
 * recent route instead rendering if user is not authenticated. This is useful
 * routes that should not be displayed if a user is logged in, such as the
 * login route.
 */
export const UserIsNotAuthenticated = connectedRouterRedirect({
  AuthenticatingComponent: LoadingSpinner,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false,
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: ({ firebase: { auth } }) => auth.isEmpty,
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing,
  redirectPath: (_, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || AUTH_PATH,
  redirectAction: newLoc => dispatch => {
    // Use push, replace, and go to navigate around.
    history.push(newLoc);
    dispatch({
      type: AUTHED_REDIRECT,
      payload: { message: 'User is not authenticated.' }
    });
  }
});

/**
 * Render children based on route config objects
 * @param {Array} routes - Routes settings array
 * @param {Object} match - Routes settings array
 * @param {Object} parentProps - Props to pass to children from parent
 */
export function renderChildren(routes, match, parentProps) {
  return routes.map(route => (
    <Route
      key={`${match.url}-${route.path}`}
      path={`${match.url}/${route.path}`}
      render={props => <route.component {...parentProps} {...props} />}
    />
  ));
}
