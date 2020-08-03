import { Loadable } from 'utils/components';
// Sync route definition
export default {
  path: '/ViewProfile',
  component: Loadable({
    loader: () => import(/* webpackChunkName: 'ViewProfile' */ './components/ViewProfile')
  })
};
