import PouchDB from 'pouchdb';

var db = new PouchDB('notepila');
// db.destroy();

export const LIST_FOLDERS = 'list_folders';
export const SELECT_FOLDER = 'select_folder';
export const ADD_FOLDER = 'add_folder';
export const REMOVE_FOLDER = 'remove_folder';
export const EDIT_FOLDER = 'edit_folder';

export const LIST_NOTES = 'list_notes';
export const SELECT_NOTE = 'select_note';
export const ADD_NOTE = 'add_note';
export const REMOVE_NOTE = 'remove_note';
export const EDIT_NOTE = 'edit_note';

export const selectFolder = (folder) => {
  if (folder.doc) {
    return {
      type: SELECT_FOLDER,
      payload: folder.doc
    }
  } else {
    console.log('SELECT_FOLDER folder:', folder);
    const query = db.get(folder).then((doc) => {
      console.log('SELECT_FOLDER res:', doc);
      return doc;
    }).catch((err) => {});

    return {
      type: SELECT_FOLDER,
      payload: query
    }
  }
}

export function listFolders() {
  const query = db.query('folders/index', {
    include_docs: true
  }).then((res) => {
    if (res.rows.length == 0) {
      // Create Main if it's not there.
      return db.put({
        _id: 'main',
        type: 'folder',
        name: 'Main'
      }).then((response) => {
        return db.get(response.id).then((doc) => {
          return doc;
        });
      }).catch((err) => {
        console.log('post main err:', err);
      });
    } else {
      return res.rows;
    }
  }).catch((err) => {
    const ddoc = {
      _id: '_design/folders',
      views: {
        index: {
          map: function mapFun(doc) {
            if (doc.type == 'folder') {
              emit(doc);
            }
          }.toString()
        }
      }
    }

    // Save the _design/folders view to the database.
    return db.put(ddoc).catch((err) => {
      if (err.name !== 'conflict') {
        throw err;
      }
    }).then((res) => {
      return listFolders();
    }).catch((err) => {
      console.log('put ddoc err:', err);
    });
  });

  return {
    type: LIST_FOLDERS,
    payload: query
  }
}

export function addFolder(name) {
  // Create the new folder in the database.
  const query = db.post({
    type: 'folder',
    name: name
  }).then((response) => {
    return db.get(response.id).then((doc) => {
      return {doc, added: doc._id};
    });
  }).catch((err) => {
  });

  return {
    type: LIST_FOLDERS,
    payload: query
  }
}

export function editFolder(folder, name) {
  // Update the folder in the database.
  const query = db.put({
    _id: folder._id,
    _rev: folder._rev,
    name: name,
    type: 'folder'
  }).then((response) => {
    return db.get(response.id).then((doc) => {
      return {doc: doc, updated: doc._id};
    });
  }).catch((err) => {
    console.log('editFolder err:', err);
  });

  // listFolders();

  return {
    type: LIST_FOLDERS,
    payload: query
  }
}

export function deleteFolder(folder) {
  const query = db.remove(folder).then((res) => {
    return {res: res, deleted: res.id};
  })
  return {
    type: LIST_FOLDERS,
    payload: query
  }
}
