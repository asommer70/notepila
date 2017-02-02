import { LIST_NOTES, UPDATE_NOTE, SELECT_NOTE, ADD_NOTE, DELETE_NOTE } from '../actions/note_actions';

export default function(state = [], action) {
  switch (action.type) {
    case LIST_NOTES:
      console.log('LIST_NOTES state:', state, 'action:', action);
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
      console.log('ADD_NOTE state:', state, 'action:', action);
      const addDocs = [...state.docs, {doc: action.payload, id: action.payload._id}];
      return {...state, docs: addDocs};
    case DELETE_NOTE:
      const delDocs = state.docs.filter((folder) => {
        if (folder.id != action.payload.deleted) {
          return folder
        }
      });
      return {...state, docs: delDocs};
    case SELECT_NOTE:
      console.log('SELECT_NOTE state:', state, 'action:', action);
      return {...state, active: action.payload};
    default:
      return state;
  }
}
