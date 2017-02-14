import { LIST_FOLDERS, UPDATE_FOLDER, SELECT_FOLDER, ADD_FOLDER, DELETE_FOLDER } from '../actions/folder_actions';
import { LIST_NOTES, UPDATE_NOTE, SELECT_NOTE, ADD_NOTE, DELETE_NOTE, GET_ACTIVE_NOTE } from '../actions/note_actions';
import { SETTINGS, SYNC } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case LIST_FOLDERS:
      return {...state, folders: action.payload};
    case UPDATE_FOLDER:
      const updatedFolders = state.folders.map((folder) => {
        if (folder.id == action.payload.updated) {
          return {doc: action.payload.doc, id: action.payload.updated};
        } else {
          return folder;
        }
      });
      return {...state, folders: updatedFolders};
    case ADD_FOLDER:
      const addFolders = [...state.folders, {doc: action.payload.doc, id: action.payload.doc._id}];
      return {...state, folders: addFolders};
    case DELETE_FOLDER:
      const delFolders = state.folders.filter((folder) => {
        if (folder.id != action.payload.deleted) {
          return folder
        }
      });
      return {...state, folders: delFolders};
    case SELECT_FOLDER:
      return {...state, activeFolder: action.payload};
    case LIST_NOTES:
      return {...state, notes: action.payload};
    case UPDATE_NOTE:
      const updatedNotes = state.notes.map((folder) => {
        if (folder.id == action.payload.updated) {
          return {doc: action.payload.doc, id: action.payload.updated};
        } else {
          return folder;
        }
      });
      return {...state, notes: updatedNotes};
    case ADD_NOTE:
      const addNotes = [...state.notes, {doc: action.payload, id: action.payload._id}];
      return {...state, notes: addNotes};
    case DELETE_NOTE:
      const delNotes = state.notes.filter((note) => {
        if (note.id != action.payload.deleted) {
          return note
        }
      });
      return {...state, notes: delNotes};
    case SELECT_NOTE:
      return {...state, activeNote: action.payload};
    case SETTINGS:
      return {...state, settings: action.payload};
    case SYNC:
      return {...state, sync: action.payload};
    default:
      return state;
  }
}
