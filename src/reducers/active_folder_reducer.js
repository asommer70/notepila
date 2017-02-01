import { SELECT_FOLDER } from '../actions';

export default function(state = null, action) {
  switch (action.type) {
    case SELECT_FOLDER:
      return action.payload
  }
  return state;
}
