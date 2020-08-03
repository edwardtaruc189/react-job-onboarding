import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Switch } from 'react-router-dom';
import { isEmpty } from 'react-redux-firebase/lib/helpers';
import BackgroundPaper from 'components/BackgroundPaper';
import Candidates from './Candidates';
import Companies from './Companies';
import CompanySignupForm from '../CompanySignupForm';

function Home({
  classes,
  profile,
  quizzes,
  candidateChallenges,
  uid,
  users,
  companySignup,
  approveUser,
  onSubmitFail,
  history
}) {
  let someDate = new Date();
  const numberOfDaysToAdd = -30;
  someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

  let quizData = [];
  if (Array.isArray(quizzes)) {
    quizData = quizzes.filter(({ value }) => value.createdBy === uid);
  }

  if (!isEmpty(quizData)) {
    if (!Array.isArray(quizData)) {
      return;
    }
  }

  if (profile.role !== 'admin') {
    history.push('/');
  }

  return (
    <BackgroundPaper className={classes.pane} square={false}>
      <h2>Welcome admin {profile.displayName}</h2>

      <div>
        <h1>Hello admin</h1>
        <ul>
          <li>
            <Link to="/admin/candidates">View Candidates</Link>
          </li>
          <li>
            <Link to="/admin/companies">View Companies</Link>
          </li>
          <li>
            <Link to="/admin/addCompany">Add Company</Link>
          </li>
        </ul>
        <Switch>
          <Route
            path="/admin/candidates"
            component={() => (
              <Candidates
                {...{ quizzes, users, classes, candidateChallenges }}
                approval={userId => approveUser(userId)}
              />
            )}
          />
          <Route
            path="/admin/companies"
            component={() => <Companies {...{ quizzes, users }} />}
          />
          <Route
            path="/admin/addCompany"
            component={() => (
              <CompanySignupForm
                onSubmit={companySignup}
                onSubmitFail={onSubmitFail}
              />
            )}
          />
        </Switch>
      </div>
    </BackgroundPaper>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  companySignup: PropTypes.func.isRequired, // from enhancer (withStyles)
  approveUser: PropTypes.func.isRequired
};

export default Home;
