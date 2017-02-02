import { LIST_FOLDERS, EDIT_FOLDER } from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case LIST_FOLDERS:
      if (state.length === 0) {
        console.log(' folder list...');
        return action.payload;
      } else if (action.payload.updated !== undefined) {
        return state.map((folder) => {
          if (folder.id == action.payload.updated) {
            return {doc: action.payload.doc, id: action.payload.updated};
          } else {
            return folder;
          }
        });
      } else {
        return [{doc: action.payload}, ...state];
      }
    default:
      return state;
  }
}
