import { LIST_FOLDERS, UPDATE_FOLDER, SELECT_FOLDER, ADD_FOLDER, DELETE_FOLDER } from '../actions/folder_actions';
import { LIST_NOTES, UPDATE_NOTE, SELECT_NOTE, ADD_NOTE, DELETE_NOTE, GET_ACTIVE_NOTE } from '../actions/note_actions';
// import { listNotes } from '../actions/note_actions';

export default function(state = [], action) {
  switch (action.type) {
    case LIST_FOLDERS:
      // console.log('LIST_FOLDERS state:', state, 'action:', action);
      return {...state, folders: action.payload};
    case UPDATE_FOLDER:
      const updatedFolders = state.docs.map((folder) => {
        if (folder.id == action.payload.updated) {
          return {doc: action.payload.doc, id: action.payload.updated};
        } else {
          return folder;
        }
      });
      return {...state, docs: updatedFolders};
    case ADD_FOLDER:
      const addFolders = [...state.docs, {doc: action.payload.doc, id: action.payload.doc._id}];
      return {...state, docs: addFolders};
    case DELETE_FOLDER:
      const delFolders = state.docs.filter((folder) => {
        if (folder.id != action.payload.deleted) {
          return folder
        }
      });
      return {...state, docs: delFolders};
    case SELECT_FOLDER:
      console.log('SELECT_FOLDER state:', state, 'action:', action);
      return {...state, activeFolder: action.payload};
    case LIST_NOTES:
      // console.log('LIST_NOTES state:', state, 'action:', action);
      return {...state, notes: action.payload};
    case UPDATE_NOTE:
      const updatedNotes = state.docs.map((folder) => {
        if (folder.id == action.payload.updated) {
          return {doc: action.payload.doc, id: action.payload.updated};
        } else {
          return folder;
        }
      });
      return {...state, docs: updatedNotes};
    case ADD_NOTE:
      console.log('ADD_NOTE state:', state, 'action:', action);
      const addNotes = [...state.docs, {doc: action.payload, id: action.payload._id}];
      return {...state, docs: addNotes};
    case DELETE_NOTE:
      const delNotes = state.docs.filter((folder) => {
        if (folder.id != action.payload.deleted) {
          return folder
        }
      });
      return {...state, docs: delNotes};
    case SELECT_NOTE:
      console.log('SELECT_NOTE state:', state, 'action:', action);
      return {...state, activeNote: action.payload};
    // case GET_ACTIVE_NOTE:
    //   console.log('SELECT_NOTE state:', state, 'action:', action);
    //   return {...state, active: action.payload};
    //   // return action.payload
    default:
      return state;
  }
}
