import { Loadable } from 'utils/components';
import { CHANGE_PASSWORD_PATH as path } from 'constants/paths';

export default {
  path,
  component: Loadable({
    loader: () => import(/* webpackChunkName: 'Account' */ './component')
  })
};
