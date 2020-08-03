import { Loadable } from 'utils/components';
import { SETTINGS_PAGE_PATH as path } from 'constants/paths';

export default {
  path,
  component: Loadable({
    loader: () => import(/* webpackChunkName: 'Account' */ './component')
  })
};
