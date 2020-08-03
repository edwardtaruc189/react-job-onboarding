import { Loadable } from 'utils/components';
import { JOB_CENTRAL_PATH as path } from 'constants/paths';

export default {
  path,
  component: Loadable({
    loader: () => import(/* webpackChunkName: 'JobCentral' */ './components/View')
  })
};
