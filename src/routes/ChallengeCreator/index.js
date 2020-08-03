import { Loadable } from 'utils/components';
import { CHALLENGE_CREATOR_PATH as path } from 'constants/paths';

export default {
  path,
  component: Loadable({
    loader: () => import(/* webpackChunkName: 'ChallengeCreator' */ './components/View')
  })
};
