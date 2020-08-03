/* eslint-disable react/jsx-no-target-blank */
import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const Candidates = ({ users, quizzes, approval, candidateChallenges, classes: { actionButtons } }) => {
  return (
    <MaterialTable
      icons={tableIcons}
      title="Candidates"
      columns={[
        { title: 'E-mail', field: 'email' },
        { title: 'First Name', field: 'firstName' },
        { title: 'Last Name', field: 'lastName' },
        { title: 'Status', field: 'approval' },
        { title: 'Profile', field: 'viewProfile' },
        { title: 'Challenges', field: 'viewChallenges' }
      ]}
      data={users
        .filter(({ value: { role } }) => role !== 'admin' && role !== 'company')
        .map(({ key, value }) => {
          const { firstName, lastName, shallPass, email } = value;

          const didPass = quizzes
            .filter(({ value }) => value.createdBy === key)
            .filter(({ value }) => {
              const { score } = value;

              return score >= 0.75;
            }).length;

          return {
            ...value,
            info: `${firstName} ${lastName}`,
            email,
            passedQuiz: didPass ? 'Passed' : 'Did not pass',
            passedInterview: shallPass ? 'Passed' : 'Did not pass',
            approval: didPass ? (
              !shallPass ? (
                <span className={actionButtons} onClick={() => approval(key)}>
                  Approve
                </span>
              ) : (
                'Already Approved'
              )
            ) : (
              'Has not passed quiz'
            ),
            viewProfile: (
              <a target="_blank" href={'/ViewProfile?uid=' + key}>
                View Profile
              </a>
            ),
            viewChallenges:
              !shallPass &&
              candidateChallenges &&
              Object.entries(candidateChallenges).filter(
                ([
                  k,
                  {
                    value: { createdBy }
                  }
                ]) => key === createdBy
              ).length ? (
                <a target="_blank" href={'/GradeChallenges?uid=' + key}>
                  View Challenges
                </a>
              ) : null
          };
        })}
    />
  );
};

export default Candidates;
