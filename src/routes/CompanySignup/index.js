import { Loadable } from 'utils/components';
import { COMPANY_SIGNUP_PATH as path } from 'constants/paths';

export default {
  path,
  component: Loadable({
    loader: () => import(/* webpackChunkName: 'CompanySignup' */ './SignupPage')
  })
};
