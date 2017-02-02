import { LIST_FOLDERS, EDIT_FOLDER } from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case LIST_FOLDERS:
      if (state.length === 0) {
        return action.payload;
      } else if (action.payload.updated !== undefined) {
        return state.map((folder) => {
          if (folder.id == action.payload.updated) {
            return {doc: action.payload.doc, id: action.payload.updated};
          } else {
            return folder;
          }
        });
      } else if (action.payload.deleted !== undefined) {
        return state.filter((folder) => {
          if (folder.id != action.payload.deleted) {
            return folder
          }
        });
      } else if (action.payload.added != undefined) {
        return [{doc: action.payload.doc, id: action.payload.doc._id}, ...state];
      } else {
        return state;
      }
    default:
      return state;
  }
}
