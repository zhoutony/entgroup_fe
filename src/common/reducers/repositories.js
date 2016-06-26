import { FETCH_REPOSITORIES_SUCCESS } from '../actions';

export default function repositories(state = [], action) {
  switch (action.type) {
    case FETCH_REPOSITORIES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
