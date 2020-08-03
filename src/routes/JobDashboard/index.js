import { Loadable } from 'utils/components';
import { JOB_DASHBOARD_PATH as path } from 'constants/paths';

export default {
  path,
  component: Loadable({
    loader: () => import(/* webpackChunkName: 'JobDashboard' */ './components/View')
  })
};
