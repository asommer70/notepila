import slugify from 'slugify';
import { db } from './index';
import moment from 'moment';

export const LIST_NOTES = 'list_notes';
export const SELECT_NOTE = 'select_note';
export const ADD_NOTE = 'add_note';
export const REMOVE_NOTE = 'remove_note';
export const UPDATE_NOTE = 'update_note';

export function listNotes(folder) {
  const query = db.query('notes/index', {
    key: folder,
    include_docs: true,
  })

  return (dispatch) => {
    query.then((data) => {
      console.log('listNotes data:', data);
      dispatch({
        type: LIST_NOTES,
        payload: data.rows
      })
    })
  }
}

export function selectNote(note) {
  return {
    type: SELECT_NOTE,
    payload: note
  }
}

export function saveNote(note) {
  const newNote = {
    _id: slugify(note.title),
    title: note.title,
    body: note.body,
    folder: note.folderId
  }

  let type;
  note.updatedAt = new moment.unix()
  if (!note._rev) {
    note.createdAt = new moment.unix();
    type = ADD_NOTE;
  } else {
    type = UPDATE_NOTE;
  }

  const query = db.put(newNote).then((res) => {
    return db.get(res.id, {include_docs: true}).then((doc) => {
      console.log('saveNote put doc:', doc);
      return doc;
    });
  }).catch((err) => {
    console.log('saveNote err:', err);
  });

  return {
    type: type,
    payload: query
  }
}
