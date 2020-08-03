import React from 'react';

export function renderQuizzes(quizzesList) {
  return quizzesList.map(({ value: { createdAt, score } }) => {
    const ts = new Date(createdAt);
    return (
      <div key={createdAt}>
        <p>
          <span>{ts.toLocaleDateString()}</span>-
          <span>{score >= 0.7 ? 'Pass' : 'Fail'}</span>
        </p>
      </div>
    );
  });
}

export const renderChallenges = challenges =>
  challenges.map(({ value: { createdAt, complete, graded, shallPass } }) => {
    if (!complete) return null;
    const date = new Date(createdAt);
    return (
      <div key={createdAt}>
        <p>
          <span>
            Challenge{' '}
            {(graded && (shallPass ? 'passed' : 'failed')) || 'completed'} on:{' '}
            {date.toLocaleDateString()}
          </span>
        </p>
      </div>
    );
  });
