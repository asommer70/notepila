import { LIST_FOLDERS } from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case LIST_FOLDERS:
      if (state.length === 0) {
        return action.payload;
      } else {
        return [{doc: action.payload}, ...state];
      }
    default:
      return state;
  }
}
