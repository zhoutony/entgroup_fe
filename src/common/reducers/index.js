import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import repository from './repository';
import repositories from './repositories';

const rootReducer = combineReducers({
  routing,
  repository,
  repositories,
});

export default rootReducer;
