import PouchDB from 'pouchdb';

var db = new PouchDB('notepila');

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
  return {
    type: SELECT_FOLDER,
    payload: folder.doc
  }
}

export function listFolders() {
  const query = db.query('folders/index', {
    include_docs: true
  }).then((res) => {
    if (res.rows.length == 0) {
      // Create Main if it's not there.
      props.db.post({
        type: 'folder',
        name: 'Main'
      }).then((response) => {
        props.db.get(response.id).then((doc) => {
          // this.setState({folders: [{doc: doc}]});
        });
      }).catch((err) => {
      });
    } else {
      return res.rows;
    }
  }).catch((err) => {
    return [];
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
      return doc;
    });
  }).catch((err) => {
  });

  return {
    type: LIST_FOLDERS,
    payload: query
  }
}
