import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';

import CoreLayout from '../layouts/CoreLayout';
import Home from './Home';
import AuthHome from './AuthHome';
import CompanyMarketing from './CompanyMarketing';
import CompanySignup from './CompanySignup';
import LoginRoute from './Login';
import SignupRoute from './CandidateSignup';
import CodingChallenge from './CodingChallenge';
import AdminRoute from './Admin';
import AccountRoute from './Account';
import NotFoundRoute from './NotFound';
import ViewProfile from './ViewProfile';
import AdminGradeChallenges from './AdminGradeChallenges';
import Availability from './Availability';
import ViewCompanyProfile from './ViewCompanyProfile';
import ChallengeCreator from './ChallengeCreator';
import JobCentral from './JobCentral';
import JobManager from './JobManager';
import JobDashboard from './JobDashboard';
import Settings from './Settings';
import ViewChallenges from './ViewChallenges';
import ChangePassword from './ChangePassword';

const history = createBrowserHistory();

history.listen((location, action) => {
  ReactGA.initialize('UA-54415203-8');
  ReactGA.pageview(window.location.pathname + window.location.search);
});

export default function createRoutes(store) {
  return (
    <Router history={history}>
      <CoreLayout>
        <Switch>
          <Route exact path={Home.path} component={Home.component} />
          {/* Build Route components from routeSettings */
          [
            AccountRoute,
            SignupRoute,
            LoginRoute,
            AuthHome,
            CompanyMarketing,
            CompanySignup,
            AdminRoute,
            ViewProfile,
            AdminGradeChallenges,
            Availability,
            ViewCompanyProfile,
            JobCentral,
            JobManager,
            JobDashboard,
            Settings,
            ChallengeCreator,
            CodingChallenge,
            ViewChallenges,
            ChangePassword
          ].map((settings, index) => (
            <Route key={`Route-${index}`} {...settings} />
          ))}
          <Route component={NotFoundRoute.component} />
        </Switch>
      </CoreLayout>
    </Router>
  );
}
