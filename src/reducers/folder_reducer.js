import { LIST_FOLDERS, UPDATE_FOLDER, SELECT_FOLDER, ADD_FOLDER, DELETE_FOLDER } from '../actions/folder_actions';
import { listNotes } from '../actions/note_actions';

export default function(state = [], action) {
  switch (action.type) {
    case LIST_FOLDERS:
      listNotes(action.payload._id);
      return {docs: action.payload};
    case UPDATE_FOLDER:
      const updatedDocs = state.docs.map((folder) => {
        if (folder.id == action.payload.updated) {
          return {doc: action.payload.doc, id: action.payload.updated};
        } else {
          return folder;
        }
      });
      return {...state, docs: updatedDocs};
    case ADD_FOLDER:
      const addDocs = [...state.docs, {doc: action.payload.doc, id: action.payload.doc._id}];
      return {...state, docs: addDocs};
    case DELETE_FOLDER:
      const delDocs = state.docs.filter((folder) => {
        if (folder.id != action.payload.deleted) {
          return folder
        }
      });
      return {...state, docs: delDocs};
    case SELECT_FOLDER:
      return {...state, active: action.payload};
    default:
      return state;
  }
}
