import slugify from 'slugify';
import { db } from './index';

export const LIST_NOTES = 'list_notes';
export const SELECT_NOTE = 'select_note';
export const ADD_NOTE = 'add_note';
export const REMOVE_NOTE = 'remove_note';
export const UPDATE_NOTE = 'update_note';

export function listNotes(folder) {
  db.query(function(doc, emit) {
    if (doc.folder === folder._id) {
      emit(doc);
    }
  }).then(function (res) {
    return res.rows;
  }).catch(function (err) {
    console.log(err);
  });

  return {
    type: LIST_NOTES,
    payload: query
  }
}
