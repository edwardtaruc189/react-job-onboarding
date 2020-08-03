import React from 'react';

import { Link, Breadcrumbs, Typography } from '@material-ui/core';

// bccArr
// [
//     {
//         link: "/",
//         label: "Home"
//     }
// ]

const breadCrumbCreator = (bcArr, history = null, containerStyles = null) => {
  const goToRoute = route => history.push(route);
  return (
    <Breadcrumbs aria-label="breadcrumb" style={containerStyles}>
      {bcArr.map((data, index) => {
        const { label, link } = data || { label: '', link: '' };

        return index === bcArr.length - 1 ? (
          <Typography key={index} color="textPrimary" variant="body2">
            {label}
          </Typography>
        ) : (
          <Link key={index} onClick={() => goToRoute(link)}>
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default breadCrumbCreator;
