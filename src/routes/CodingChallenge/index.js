import { Loadable } from 'utils/components';
// Sync route definition
export default {
  path: '/CodingChallenge',
  component: Loadable({
    loader: () => import(/* webpackChunkName: 'CodingChallenge' */ './components/View')
  })
};
