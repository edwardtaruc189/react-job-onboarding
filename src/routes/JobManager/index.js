import { Loadable } from 'utils/components';
import { JOB_MANAGER_PATH as path } from 'constants/paths';

export default {
  path,
  component: Loadable({
    loader: () => import(/* webpackChunkName: 'JobManager' */ './components/View')
  })
};
