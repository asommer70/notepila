import { LIST_NOTES, UPDATE_NOTE, SELECT_NOTE, ADD_NOTE, DELETE_NOTE } from '../actions/note_actions';

export default function(state = [], action) {
  switch (action.type) {
    case LIST_NOTES:
      return {docs: action.payload};
    case UPDATE_NOTE:
      const updatedDocs = state.docs.map((folder) => {
        if (folder.id == action.payload.updated) {
          return {doc: action.payload.doc, id: action.payload.updated};
        } else {
          return folder;
        }
      });
      return {...state, docs: updatedDocs};
    case ADD_NOTE:
      const addDocs = [...state.docs, {doc: action.payload.doc, id: action.payload.doc._id}];
      return {...state, docs: addDocs};
    case DELETE_NOTE:
      const delDocs = state.docs.filter((folder) => {
        if (folder.id != action.payload.deleted) {
          return folder
        }
      });
      return {...state, docs: delDocs};
    case SELECT_NOTE:
      return {...state, active: action.payload};
    default:
      return state;
  }
}
