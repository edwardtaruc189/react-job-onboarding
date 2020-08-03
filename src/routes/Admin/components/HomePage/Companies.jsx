/* eslint-disable react/jsx-no-target-blank */
import React from 'react';

const Candidates = ({ users /*quizzes*/ }) =>
  users
    .filter(({ value: { role } }) => role === 'company')
    .map(({ key, value }) => {
      const { firstName, lastName, email /*shallPass*/ } = value;

      // const didPass = quizzes
      //   .filter(({ value }) => value.createdBy === key)
      //   .filter(({ value }) => {
      //     const { score } = value

      //     return score >= 0.75
      //   }).length

      return (
        <div key={key}>
          <h2>
            {firstName} {lastName}
          </h2>
          <p>
            <a href={`mailto:${email}`} target="_blank">
              Email
            </a>
          </p>
          <a href={`/ViewCompanyProfile?uid=${key}`}>View Profile</a>
          <hr />
        </div>
      );
    });

export default Candidates;
