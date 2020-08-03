import { Loadable } from 'utils/components';

export default {
  path: '/ViewCompanyProfile',
  component: Loadable({
    loader: () => import('./components/ViewCompanyProfile')
  })
};
