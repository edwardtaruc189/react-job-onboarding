import { Loadable } from 'utils/components';
import { GRADE_CHALLENGES } from 'constants/paths';

export default {
  path: GRADE_CHALLENGES,
  component: Loadable({
    loader: () =>
      import(
        /* webpackChunkName: 'ViewChallenges' */ './components/AdminGradeChallenges'
      )
  })
};
