import slugify from 'slugify';
import { db } from './index';

import { listNotes, LIST_NOTES } from './note_actions';

export const LIST_FOLDERS = 'list_folders';
export const SELECT_FOLDER = 'select_folder';
export const ADD_FOLDER = 'add_folder';
export const DELETE_FOLDER = 'remove_folder';
export const UPDATE_FOLDER = 'update_folder';

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

    const notesQuery = db.query('folders/notes', {
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

export function listFolders() {
  // const query = db.query('folders/index', {
  //   include_docs: true,
  // }).then((res) => {
  //   if (res.rows.length == 0) {
  //     // Create Main if it's not there.
  //     return db.put({
  //       _id: 'main',
  //       type: 'folder',
  //       name: 'Main'
  //     }).then((response) => {
  //       return db.get(response.id).then((doc) => {
  //         return doc;
  //       });
  //     }).catch((err) => {
  //       console.log('post main err:', err);
  //     });
  //   } else {
  //     return res.rows;
  //   }
  // }).catch((err) => {
  //   const ddoc = {
  //     _id: '_design/folders',
  //     views: {
  //       index: {
  //         map: function mapFun(doc) {
  //           if (doc.type == 'folder') {
  //             emit(doc._id);
  //           }
  //         }.toString()
  //       },
  //       notes: {
  //         map: function mapFun(doc) {
  //           if (doc.type == 'note') {
  //             emit(doc.folder);
  //           }
  //         }
  //       }
  //     }
  //   }
  //
  //   // Save the _design/folders view to the database.
  //   return db.put(ddoc).catch((err) => {
  //     if (err.name !== 'conflict') {
  //       throw err;
  //     }
  //   }).then((res) => {
  //     return listFolders();
  //   }).catch((err) => {
  //     console.log('put ddoc err:', err);
  //   });
  // });

  const query = db.query('folders/index', {
    include_docs: true,
  })

  return (dispatch) => {
    query.then((data) => {
      console.log('listFolders data:', data);
      dispatch({
        type: LIST_FOLDERS,
        payload: data.rows
      })
    })
  }

  // return {
  //   type: LIST_FOLDERS,
  //   payload: query
  // }
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
