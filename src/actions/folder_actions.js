import slugify from 'slugify';
import { db } from './index';

import { listNotes } from './note_actions';

export const LIST_FOLDERS = 'list_folders';
export const SELECT_FOLDER = 'select_folder';
export const ADD_FOLDER = 'add_folder';
export const DELETE_FOLDER = 'remove_folder';
export const UPDATE_FOLDER = 'update_folder';

export const selectFolder = (folder) => {
  if (folder.doc) {
    // listNotes(folder.doc._id);
    return {
      type: SELECT_FOLDER,
      payload: folder.doc
    }
  } else {
    // listNotes(folder);
    const query = db.get(folder).then((doc) => {
      return doc;
    }).catch((err) => {});

    return {
      type: SELECT_FOLDER,
      payload: query
    }
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
  }).then((response) => {
    return db.get(response.id).then((doc) => {
      return {doc, added: doc._id};
    });
  }).catch((err) => {
  });

  return {
    type: ADD_FOLDER,
    payload: query
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

  const query = db.put(updated).then((response) => {
    return db.get(response.id).then((doc) => {
      return {doc: doc, updated: doc._id};
    });
  }).catch((err) => {
    console.log('editFolder err:', err);
  });

  // listFolders();

  return {
    type: UPDATE_FOLDER,
    payload: query
  }
}

export function deleteFolder(folder) {
  const query = db.remove(folder).then((res) => {
    return {res: res, deleted: res.id};
  })
  return {
    type: DELETE_FOLDER,
    payload: query
  }
}
