export const withinRange = createdAt => {
  const d1 = new Date(createdAt);
  const d2 = new Date();

  const diff = d1.getTime() - d2.getTime();
  return diff / (1000 * 60 * 60 * 24);
};

/**
 * @typedef {Object} DateObject
 * @property {number} createdAt
 */

/**
 * Takes an array of Objects containing a createdAt key and returns true if they are all older than a
 * certain number of days
 * @param {DateObject} items
 * @param {number} maxDays
 * @return {Array} [mostRecentDate, outsideDateRange]
 */
export const allOutsideOfRange = (items, maxDays) => {
  if (items.length < 1) return [null, true];

  let unfinishedChallenges = false;
  const dates = items.map(({ value: { createdAt, complete, graded } }) => {
    if (!complete || !graded) unfinishedChallenges = true;
    return createdAt;
  });
  const latest = Math.max(...dates);
  const mostRecentDate = withinRange(latest);

  return [
    mostRecentDate,
    unfinishedChallenges || Math.floor(mostRecentDate) + maxDays <= 0
  ];
};
