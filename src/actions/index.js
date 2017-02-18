import PouchDB from 'pouchdb';
import moment from 'moment';

PouchDB.plugin(require('pouchdb-quick-search'));
PouchDB.plugin(require('pouchdb-upsert'));
window.PouchDB = PouchDB;

export const db = new PouchDB('notepila');
// db.destroy();

export const addDesignDoc = () => {
  const folders_ddoc = {
    _id: '_design/folders',
    views: {
      index: {
        map: function mapFun(doc) {
          if (doc.type == 'folder') {
            emit(doc._id);
          }
        }.toString()
      }
    }
  };

  const notes_ddoc = {
    _id: '_design/notes',
    views: {
      index: {
        map: function mapFun(doc) {
          if (doc.type == 'note') {
            emit(doc.folder);
          }
        }.toString()
      }
    }
  };

  // Save the _design docs to the database.
  db.bulkDocs([folders_ddoc, notes_ddoc]).then((res) => {
    db.put({
      _id: 'main',
      type: 'folder',
      name: 'Main'
    }).then((res) => {
      console.log('Created main...');
      window.location.reload();
    });
  }).catch((err) => {
    console.log('bulkDocs err:', err);
  });
}

export const SETTINGS = 'settings'
export const updateSettings = (settings=null) => {
  if (settings) {
    db.put(settings).catch((err) => {
      console.log('updateSettings put err:', err);
    });
  }

  const query = db.get('settings');

  return (dispatch) => {
    query.then((data) => {
      dispatch({
        type: SETTINGS,
        payload: data
      });
    }).catch((err) => {
      dispatch({
        type: SETTINGS,
        payload: {syncUrl: '', _id: 'settings', syncDate: ''}
      });
    })
  }
}

export const SYNC = 'sync';
export const syncDatabase = (settings) => {
  let remoteDB = new PouchDB(settings.syncUrl);

  let sync = db.sync(remoteDB);

  return (dispatch) => {
    sync.on('complete', () => {
      const newSettings = {...settings, syncDate: moment().unix()};

      updateSettings(newSettings);
      window.location.reload();

      dispatch({
        type: SYNC,
        payload: newSettings
      })
    }).on('error', (err) => {
      console.log('db.sync err:', err);
    });
  }
}
