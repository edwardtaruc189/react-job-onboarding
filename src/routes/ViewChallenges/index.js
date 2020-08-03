import { Loadable } from 'utils/components';
import { VIEW_CHALLENGES } from 'constants/paths';

export default {
  path: VIEW_CHALLENGES,
  component: Loadable({
    loader: () =>
      import(
        /* webpackChunkName: 'ViewChallenges' */ './components/ViewChallenges'
      )
  })
};
