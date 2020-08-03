import Hubspot from 'hubspot';

const hubspot = new Hubspot({
  apiKey: '12b2bfc2-9613-40ae-a9eb-99468499630a',
  checkLimit: true // (Optional) Specify whether or not to check the API limit on each call. Default: true
});

export default hubspot;
