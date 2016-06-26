import App from './containers/App';
import Repository from './containers/Repository';
import Repositories from './containers/Repositories';

export default (store) => {
  return {
    path: '/',
    component: App,
    indexRoute: {
      component: Repositories,
    },
    childRoutes: [
      {
        path: '/repositories/:owner/:repo',
        component: Repository,
      },
    ],
  };
};
