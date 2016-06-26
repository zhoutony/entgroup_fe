import { FETCH_REPOSITORY_REQUEST, FETCH_REPOSITORY_SUCCESS } from '../actions';

export default function repository(state = {}, action) {
  switch (action.type) {
    case FETCH_REPOSITORY_REQUEST:
      return {};
    case FETCH_REPOSITORY_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
