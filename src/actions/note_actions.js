import slugify from 'slugify';
import { db } from './index';
import moment from 'moment';

export const LIST_NOTES = 'list_notes';
export const SELECT_NOTE = 'select_note';
export const ADD_NOTE = 'add_note';
export const REMOVE_NOTE = 'remove_note';
export const UPDATE_NOTE = 'update_note';
// export const SELECT_FOLDER = 'select_folder';
export const GET_ACTIVE_NOTE = 'get_active_note';

export function listNotes(folder) {
  const query = db.query('notes/index', {
    key: folder,
    include_docs: true,
  })

  return (dispatch) => {
    query.then((data) => {
      // console.log('listNotes data:', data);
      dispatch({
        type: LIST_NOTES,
        payload: data.rows
      })
    })
  }
}

export function selectNote(note) {
  console.log('selectNote note:', note.doc);
  // return {
  //   type: SELECT_NOTE,
  //   payload: note
  // }

  return (dispatch) => {
    // dispatch({
    //   type: GET_ACTIVE_NOTE,
    //   payload: note
    // });

    dispatch({
      type: SELECT_NOTE,
      payload: note
    });
  }
}

// export function selectFolder(folderId) {
//   return {
//     type: SELECT_FOLDER,
//     payload: folderId
//   }
// }

export function getActiveNote(note) {
  console.log('getActiveNote note:', note);
  return {
    type: GET_ACTIVE_NOTE,
    payload: note
  }

  return (dispatch) => {
    dispatch({
      type: GET_ACTIVE_NOTE,
      payload: note
    });
  }
}

export function saveNote(note) {
  const newNote = {
    _id: slugify(note.title),
    title: note.title,
    body: note.body,
    folder: note.folderId,
    type: 'note'
  }

  let type;
  newNote.updatedAt = moment().unix();
  if (!newNote._rev) {
    newNote.createdAt = moment().unix();
    type = ADD_NOTE;
  } else {
    newNote._rev = note._rev;
    type = UPDATE_NOTE;
  }

  console.log('saveNote newNote:', newNote);
  const query = db.put(newNote)

  return (dispatch) => {
    query.then((data) => {
      return db.get(data.id).then((doc) => {
        dispatch({
          type: type,
          payload: doc
        })
      });
    })
  }
}
