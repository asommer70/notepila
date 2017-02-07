import slugify from 'slugify';
import { db, addDesignDoc } from './index';

import { listNotes, LIST_NOTES } from './note_actions';

export const LIST_FOLDERS = 'list_folders';
export const SELECT_FOLDER = 'select_folder';
export const ADD_FOLDER = 'add_folder';
export const DELETE_FOLDER = 'remove_folder';
export const UPDATE_FOLDER = 'update_folder';

export function listFolders() {
  const query = db.query('folders/index', {
    include_docs: true,
  })

  return (dispatch) => {
    query.then((data) => {
      dispatch({
        type: LIST_FOLDERS,
        payload: data.rows
      });
    }).catch((err) => {
      console.log('folders/index err:', err);
      if (err.name == 'not_found') {
        addDesignDoc();
      }
    })
  }
}

export const selectFolder = (folder) => {
  return (dispatch) => {
    if (!folder.doc) {
      // Set main as active Folder.
      db.get(folder).then((doc) => {
        dispatch({
          type: SELECT_FOLDER,
          payload: doc
        });
      });
    } else {
      dispatch({
        type: SELECT_FOLDER,
        payload: folder.doc
      });
    }

    // Handle Folder being deleted.
    if (!folder.id) {
      folder = {id: folder};
    }

    const notesQuery = db.query('notes/index', {
      key: folder.id,
      include_docs: true,
    })

    // Get the Notes for the selected Folder.
    notesQuery.then((data) => {
      dispatch({
        type: LIST_NOTES,
        payload: data.rows
      })
    })
  }
}

export function addFolder(name) {
  // Create the new folder in the database.
  const query = db.put({
    _id: slugify(name),
    type: 'folder',
    name: name
  });

  return (dispatch) => {
    query.then((data) => {
      return db.get(data.id).then((doc) => {
        dispatch({
          type: ADD_FOLDER,
          payload: {doc, added: doc._id}
        })
      });
    })
  }
}

export function updateFolder(folder, name) {
  // Update the folder in the database.
  const updated = {
    _id: folder._id,
    _rev: folder._rev,
    name: name,
    type: 'folder'
  };

  const query = db.put(updated);

  return (dispatch) => {
    query.then((data) => {
      return db.get(data.id).then((doc) => {
        console.log('updateFolder doc:', doc);
        dispatch({
          type: UPDATE_FOLDER,
          payload: {doc: doc, updated: doc._id}
        });
      });
    })
  }
}

export function deleteFolder(folder) {
  const query = db.remove(folder);

  return (dispatch) => {
    query.then((data) => {
      dispatch({
        type: DELETE_FOLDER,
        payload: {data: data, deleted: data.id}
      })
    })
  }
}
